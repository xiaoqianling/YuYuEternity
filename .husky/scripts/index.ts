import write from "@changesets/write";
import { Changeset } from "@changesets/types";
import { execSync, ExecSyncOptionsWithBufferEncoding } from "child_process";
import fs from "fs";

function getCommitMsg(): string {
  // 获取最近一次提交的信息
  return execSync("git log -1 --pretty=%B").toString().trim();
}

type Package = {
  path: string;
  name: string;
};

// 获取受影响的包
const getChangedPackages = (): Array<Package> => {
  const isWindows = process.platform === "win32";

  const command = "git diff --name-only HEAD^ HEAD";
  const options: ExecSyncOptionsWithBufferEncoding = {};

  if (isWindows) {
    // 在 Windows 上，使用 PowerShell 执行命令
    options.shell = "powershell.exe";
  } else {
    // 在 macOS 上，直接运行 git 命令，无需指定 shell
  }
  // 使用 git diff 获取变更文件列表
  const changedFiles = execSync(command, options).toString().trim().split("\n");

  const packageDirs = ["apps/", "packages/", "learn/"];
  const dirs = new Set<string>();

  changedFiles.forEach((file) => {
    for (const dir of packageDirs) {
      const match = file.match(new RegExp(`${dir}([^/]+)`));
      if (match) {
        dirs.add(`${dir}${match[1]}`);
        break;
      }
    }
  });

  // 验证这些路径是否确实包含package.json
  return Array.from(dirs)
    .map<Package | undefined>((dir) => {
      try {
        const pkgPath = `${dir}/package.json`;
        const pkgContent = fs.readFileSync(pkgPath, "utf-8");
        const pkg = JSON.parse(pkgContent);
        return {
          path: dir,
          name: pkg.name as string,
        };
      } catch {
        console.warn(`⚠️  ${dir} 不是一个有效的包 (缺少package.json或无效)`);
        return undefined;
      }
    })
    .filter<Package>((pkg): pkg is Package => pkg !== undefined);
};

// 创建 Changeset 文件
const generateChangeset: (
  changedPackages: Array<Package>,
  commitMessage: string,
) => Promise<string> = async (changedPackages, commitMessage) => {
  const changeset: Changeset = {
    summary: commitMessage,
    releases: changedPackages.map((pkg) => {
      return {
        name: pkg.name,
        type: "patch",
      };
    }),
  };

  const uniqueId = await write(changeset, process.cwd());
  console.log(uniqueId); // orange-foxes-waggle
  return uniqueId;
};

// 主逻辑
const main = () => {
  try {
    if (process.env.CHANGESET === "true") {
      return;
    }

    const commitMessage = getCommitMsg();
    const changedPackages = getChangedPackages();

    if (changedPackages.length === 0) {
      console.log(
        "❌ No packages were modified in this commit. 本次没有修改任何包",
      );
      return;
    }

    console.log(
      `✅ 以下包已被修改: ${changedPackages.map((p) => p.path).join(", ")}`,
    );

    generateChangeset(changedPackages, commitMessage).then((filename) => {
      console.log(`Changeset file created: ${filename}`);

      // 自动生成版本和changelog
      execSync("pnpm changeset version", { stdio: "inherit" });

      const isWindows = process.platform === "win32";

      const options: ExecSyncOptionsWithBufferEncoding = { stdio: "inherit" };
      if (isWindows) {
        options.shell = "powershell.exe";
      }
      execSync("git add .", options);
      process.env.CHANGESET = "true";
      execSync("git commit --amend --no-edit", options);
    });
  } catch (error) {
    console.error("Error processing changeset:", error);
    process.exit(1);
  }
};

main();

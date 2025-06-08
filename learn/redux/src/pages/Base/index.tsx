import { increment, incrementByAmount, setStep } from "@/lib/redux";
import { selectCount, selectStep } from "@/lib/redux/counter/selector";
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  const counts = useSelector(selectCount);
  const step = useSelector(selectStep);
  const dispatch = useDispatch();

  return (
    <div>
      <hr />
      <h1>Counter</h1>
      <p
        onClick={() => {
          dispatch(increment());
        }}
        style={{
          cursor: "pointer",
          width: "fit-content",
          backgroundColor: "red",
          userSelect: "none",
        }}
      >
        Count: {counts}
      </p>
      <label>
        Step:
        <input
          type="number"
          value={step}
          onChange={(e) => dispatch(setStep(Number(e.target.value)))}
        />
      </label>
      <hr />
    </div>
  );
}

export default Counter;

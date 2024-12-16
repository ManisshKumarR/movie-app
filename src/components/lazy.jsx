import { useRef } from "react";

const Lazy = () => {
  const inputRef = useRef();
  return (
    <div>
      <input ref={inputRef}></input>
      <button
        onClick={() => {
          console.log(inputRef.current);
        }}
      >
        Add
      </button>
    </div>
  );
};
export default Lazy;

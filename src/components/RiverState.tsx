function RiverState(props: { state: string }) {
  let classes =
    'flex items-center justify-center rounded bg-green-400 px-1 text-[10px] uppercase text-white';

  if (props.state.toLowerCase() === 'rising') {
    classes =
      'flex items-center justify-center rounded bg-yellow-400 px-1 text-[10px] uppercase text-slate-800';
  }

  if (props.state.toLowerCase() === 'falling') {
    classes =
      'flex items-center justify-center rounded bg-red-400 px-1 text-[10px] uppercase text-white';
  }

  return <div className={classes}>{props.state}</div>;
}

export default RiverState;

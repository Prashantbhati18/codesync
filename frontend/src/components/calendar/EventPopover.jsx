// Example calendar detail popover shown when a contest event is clicked.
export default function EventPopover({ contest, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded shadow" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold">{contest?.title}</h3>
      </div>
    </div>
  );
}

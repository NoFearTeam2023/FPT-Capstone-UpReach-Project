import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@emotion/css";
import { useSortable } from "@dnd-kit/sortable";

const DraggableUploadListItem = ({ originNode, file }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
  };
  const className = isDragging
    ? css`
        a {
          pointer-events: none;
        }
      `
    : "";
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === "error" && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};

export default DraggableUploadListItem;

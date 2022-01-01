// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { ChangeEventHandler, forwardRef } from "react";

interface UploadProps extends React.ComponentProps<"input"> {
  label?: string;
  onUpload?: (file: File) => void;
}

export const Upload = forwardRef<HTMLInputElement, UploadProps>(
  ({ label, onUpload, ...props }, ref) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const file = event.target.files?.[0];

      if (file && onUpload) {
        onUpload(file);
      }
    };

    return (
      <label className="block">
        {label && <span className="sr-only">{label}</span>}

        <input
          type="file"
          ref={ref}
          onChange={onChange}
          className="upload"
          {...props}
        />
      </label>
    );
  }
);

Upload.displayName = "Upload";

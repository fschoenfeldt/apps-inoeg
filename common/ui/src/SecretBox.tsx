// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Fragment } from "react";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

const renderSecret = (secret: string) => {
  const chunks = secret?.match(/.{1,4}/g) || [];
  const fragments: React.ReactNode[] = [];

  for (let i = 0; i < chunks.length; i++) {
    fragments.push(<Fragment key={`${i}-main`}>{chunks[i]}</Fragment>);

    if (i < chunks.length - 1)
      fragments.push(
        <strong key={`${i}-dot`} style={{ userSelect: "none" }} aria-hidden>
          ·
        </strong>
      );
  }

  return <>{fragments}</>;
};

export interface SecretBoxProps {
  secret: string;
  copy?: boolean;
}

export const SecretBox: React.FC<SecretBoxProps> = ({
  secret,
  copy = false,
}) => {
  return (
    <code className="flex justify-center items-center p-4 text-2xl font-bold text-white uppercase bg-black rounded">
      {renderSecret(secret)}
      {copy && (
        <CopyToClipboardButton toCopy={secret} className="text-sm">
          &
        </CopyToClipboardButton>
      )}
    </code>
  );
};

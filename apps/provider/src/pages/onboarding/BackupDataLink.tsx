import { theme } from "@kiebitz-oss/config";
import { Message } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import { useProviderApi } from "../ProviderApiContext";

interface BackupDataLinkProps {
  className?: string;
  onSuccess?: () => void;
  downloadText?: string;
}

export const BackupDataLink: React.FC<BackupDataLinkProps> = ({
  className,
  onSuccess,
  downloadText,
}) => {
  const api = useProviderApi();

  const [blob, setBlob] = useState<Blob | null>(null);

  // useEffect(() => {
  //   api.backupData().then(({ keyPair }) => {
  //     setBlob(
  //       new Blob([str2ab(JSON.stringify(keyPair))], {
  //         type: "application/octet-stream",
  //       })
  //     );
  //   });
  // }, [api]);

  let providerName = "Impfzentrum 3000";

  try {
    providerName = providerName
      .replace(/\w/g, "-")
      .replace(/\./g, "-")
      .toLowerCase();
  } catch (e) {
    // ignore?
  }

  const dateString = dayjs().format("YYYY-MM-DD-HH-mm");

  const filename =
    `${theme.title}-backup-${dateString}-${providerName}.enc`.toLowerCase();

  if (blob) {
    return (
      <a
        onClick={onSuccess}
        className={clsx("button primary md", className)}
        download={filename}
        href={URL.createObjectURL(blob)}
      >
        {downloadText || (
          <Trans id="provider.onboarding.download-backup-data">
            Sicherungsdatei herunterladen
          </Trans>
        )}
      </a>
    );
  }

  return (
    <Message waiting variant="warning">
      <Trans id="provider.onboarding.generating-backup-data">
        Bitte warten, erstelle Sicherungsdaten...
      </Trans>
    </Message>
  );
};

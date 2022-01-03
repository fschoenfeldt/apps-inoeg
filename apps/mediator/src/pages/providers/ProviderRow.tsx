import type { Provider } from "@kiebitz-oss/api";
import { Tag } from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import clsx from "clsx";
import { ChangeEventHandler, useRef } from "react";
import { Link } from "../../components/Link";

export interface ProviderRowProps {
  provider: Provider;
  selected: boolean;
  onSelect: (providerId: string, selected: boolean) => void;
}

export const ProviderRow: React.FC<ProviderRowProps> = ({
  provider,
  selected = false,
  onSelect,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const providerLink = `/providers/${provider.id}`;

  const onSelectToggle: ChangeEventHandler<unknown> = () => {
    onSelect(provider.id, !ref.current?.checked);
  };

  return (
    <tr
      key={provider.id}
      className={clsx("hover:bg-primary/10 cursor-pointer", {
        ["selected"]: selected,
      })}
      onClick={onSelectToggle}
    >
      <td scope="row">
        <input
          type="checkbox"
          className="checkbox"
          name="providers[]"
          onChange={onSelectToggle}
          value={provider.id}
          checked={selected}
          ref={ref}
          aria-label={t({
            id: "mediator.provider-row.select-row",
            message: "Impfanbieter auswählen oder abwählen",
          })}
        />
      </td>

      <td>
        <Link href={providerLink}>{provider.name || "Name missing"}</Link>
      </td>

      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
        {provider.street}
        <br />
        {provider.zipCode} {provider.city}
      </td>

      <td>
        <Tag variant={provider.verified ? "success" : "warning"}>
          {provider.verified ? (
            <Trans id="mediator.provider-row.valid">bestätigt</Trans>
          ) : (
            <Trans id="mediator.provider-row.invalid">unbestätigt</Trans>
          )}
        </Tag>
      </td>

      <td className="flex gap-4 justify-end">
        <Link href={providerLink}>
          <Trans id="mediator.provider-row.button-show">anzeigen</Trans>
        </Link>
      </td>
    </tr>
  );
};

import { Trans } from '@lingui/macro';
import { useMediatorApi } from 'hooks';
import React, { useState } from 'react';
import { Provider } from 'types';
import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
    Title,
} from 'ui';

interface ReconfirmProvidersModalProps extends ModalProps {
    providers: Provider[];
}

export const ReconfirmProvidersModal: React.FC<
    ReconfirmProvidersModalProps
> = ({ providers, onClose }) => {
    const [status, setStatus] = useState<
        'idle' | 'running' | 'success' | 'error'
    >('idle');
    const api = useMediatorApi();

    const doReconfirmProviders = async () => {
        console.log('running');
        setStatus('running');

        return Promise.all(
            providers.map((provider) => api.reconfirmProvider(provider))
        )
            .then(() => {
                setStatus('success');
            })
            .then(() => {
                if (onClose) {
                    onClose();
                }
            })
            .catch((error) => {
                console.error(error);
                setStatus('error');
            });
    };

    return (
        <Modal onClose={onClose}>
            <ModalHeader>
                <Title variant="h3" as="h2">
                    <Trans id="mediator.providers.reconfirm-modal.title">
                        Alle neu bestätigen
                    </Trans>
                </Title>
            </ModalHeader>

            <ModalContent>
                <div className="kip-provider-data">
                    {(status === 'running' && (
                        <Trans id="mediator.providers.reconfirm-modal.in-progress">
                            Bestätige Anbieter...
                        </Trans>
                    )) || (
                        <Trans id="mediator.providers.reconfirm-modal.info">
                            Wollen Sie alle bestätigten Anbieter neu bestätigen?
                        </Trans>
                    )}
                </div>
            </ModalContent>

            <ModalFooter>
                <Button onClick={doReconfirmProviders}>
                    <Trans id="mediator.providers.reconfirm-modal.button-submit">
                        {providers.length} Anbieter neu bestätigen
                    </Trans>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

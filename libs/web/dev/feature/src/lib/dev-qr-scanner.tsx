import { Button } from '@mantine/core'
import { toastError, toastInfo, toastSuccess, UiCard, UiDebug, UiStack } from '@pubkey-ui/core'
import { IconBulb, IconVolume } from '@tabler/icons-react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useEffect, useState } from 'react'

export function DevQrScanner() {
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState('No result')
  const [enabled, setEnabled] = useState(false)
  const [audio, setAudio] = useState(false)
  const [torch, setTorch] = useState(false)

  useEffect(() => {
    // Remove data and error after 5 seconds
    const timeout = setTimeout(() => {
      setData('No result')
      setError(null)
      toastInfo('Data and error cleared')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [data, error])

  return (
    <UiCard title="QR Scanner">
      <UiStack>
        <Button
          onClick={() => setEnabled((prev) => !prev)}
          color={enabled ? 'red' : 'green'}
          variant="light"
          size="xl"
          fullWidth
        >
          {enabled ? 'Stop' : 'Start'}
        </Button>

        <Button.Group>
          <Button
            onClick={() => setAudio((prev) => !prev)}
            color={audio ? 'red' : 'green'}
            variant="light"
            size="xl"
            fullWidth
            leftSection={<IconVolume />}
          >
            {audio ? 'Disable audio' : 'Enable audio'}
          </Button>
          <Button
            onClick={() => setTorch((prev) => !prev)}
            color={torch ? 'red' : 'green'}
            variant="light"
            size="xl"
            fullWidth
            leftSection={<IconBulb />}
          >
            {torch ? 'Disable torch' : 'Enable torch'}
          </Button>
        </Button.Group>

        <Scanner
          components={{
            audio,
            torch,
          }}
          options={{
            constraints: {},
          }}
          enabled={enabled}
          onResult={(result) => {
            setData(result || 'No result')
            toastSuccess('Data received')
          }}
          onError={(error) => {
            setError(error)
            toastError('Error received')
          }}
        />
        <UiDebug data={{ error, data }} open />
      </UiStack>
    </UiCard>
  )
}

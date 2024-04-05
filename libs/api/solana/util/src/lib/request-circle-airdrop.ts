export function requestCircleAirdrop({ destination, token = 'USDC' }: { destination: string; token: 'EURC' | 'USDC' }) {
  const endpoint = 'https://faucet.circle.com/api/requestToken'
  const chain = 'SOL'

  const body = {
    destinationAddress: destination,
    chain,
    token,
  }

  return fetch(endpoint, {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-GB,en;q=0.5',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'sec-ch-ua': '"Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
      Referer: 'https://faucet.circle.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: JSON.stringify(body),
    method: 'POST',
  })
}

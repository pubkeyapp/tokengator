/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */
import { Builder, JSX } from 'canvacord'
import { CSSProperties } from 'react'

interface Props {
  status: string
  earnings: string
  name: string
  avatar: string
  community: string
  background: Buffer
  poweredBy: Buffer
  icon: Buffer
  logo: Buffer
}

export interface GenerateDynamicImageOptions {
  width: number
  height: number
  status: string
  earnings: string
  name: string
  avatar: string
  community: string
  background: Buffer
  poweredBy: Buffer
  icon: Buffer
  logo: Buffer
}
export class GenerateBusinessVisaImage extends Builder<Props> {
  constructor(props: GenerateDynamicImageOptions) {
    // set width and height
    super(props.width, props.height)

    // initialize props
    this.bootstrap({
      earnings: props.earnings,
      status: props.status,
      name: props.name,
      avatar: props.avatar,
      community: props.community,
      background: props.background,
      poweredBy: props.poweredBy,
      icon: props.icon,
      logo: props.logo,
    })
  }

  override async render(): Promise<JSX.Element> {
    return (
      <TemplateRender
        status={this.options.get('status')}
        earnings={this.options.get('earnings')}
        name={this.options.get('name')}
        community={this.options.get('community')}
        background={this.options.get('background')}
        poweredBy={this.options.get('poweredBy')}
        icon={this.options.get('icon')}
        logo={this.options.get('logo')}
        avatar={this.options.get('avatar')}
      />
    )
  }
}

function TemplateRender({
  icon,
  logo,
  poweredBy,
  background,
  status,
  earnings,
  name,
  avatar,
  community,
}: {
  icon: Buffer
  logo: Buffer
  poweredBy: Buffer
  background: Buffer
  status: string
  earnings: string
  name: string
  avatar: string
  community: string
}) {
  const base64Background = Buffer.from(background).toString('base64')
  const base64PoweredBy = Buffer.from(poweredBy).toString('base64')
  const base64Icon = Buffer.from(icon).toString('base64')
  const base64Logo = Buffer.from(logo).toString('base64')
  const gray = '#383838'
  const brand = '#8743FF'
  const brandLight = '#D6C6FF'
  const brandDark = '#C41FFF'
  const lineItem: CSSProperties = {
    border: '1px solid transparent',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '402px',
    height: '60px',
    left: '80px',
  }
  const leftItem: CSSProperties = {
    ...lineItem,
    width: '401px',
    left: '541px',
  }
  return (
    <div
      style={{
        height: '1024px',
        width: '1024px',
        display: 'flex',
        fontFamily: 'BalooBhai2-Regular',
        position: 'relative',
        backgroundColor: '#DADADA',
        background: `url(data:image/png;base64,${base64Background})`,
        backgroundSize: '100% 100%',
      }}
    >
      <div
        style={{
          ...lineItem,
          width: '862px',
          top: '0px',
          height: '214px',
          fontFamily: 'BalooBhai2-Medium',
          fontSize: '64px',
          color: gray,
        }}
      >
        Business Visa
      </div>
      {/* LEFT CARD */}
      <div
        style={{
          ...lineItem,
          top: '230px',
          height: '70px',
        }}
      >
        <img height={70} src={`data:image/png;base64,${base64Icon}`} alt="Community Icon" />
      </div>
      <div style={{ ...lineItem, top: '415px' }}>
        {avatar.length ? (
          <img width={125} height={125} style={{ borderRadius: '50%' }} src={avatar} alt="Avatar" />
        ) : null}
      </div>
      <div style={{ ...lineItem, top: '530px', fontFamily: 'BalooBhai2-SemiBold', fontSize: '48px' }}>{name}</div>
      <div style={{ ...lineItem, height: '50px', top: '580px', fontSize: '36px' }}>{community}</div>
      <div style={{ ...lineItem, height: '50px', top: '680px', fontSize: '24px' }}>
        <div>x.com/beeman_nl</div>
      </div>
      <div style={{ ...lineItem, height: '50px', top: '730px', fontSize: '24px' }}>
        <div>github.com/beeman</div>
      </div>
      {/* RIGHT CARD */}
      <div style={{ ...leftItem, top: '230px', fontFamily: 'BalooBhai2-SemiBold', fontSize: '48px', color: brand }}>
        {status}
      </div>
      <div
        style={{
          ...leftItem,
          top: '540px',
          height: '50px',
          fontFamily: 'BalooBhai2-Regular',
          fontSize: '24px',
          color: brandDark,
        }}
      >
        Total Earnings
      </div>
      <div
        style={{
          ...leftItem,
          top: '580px',
          height: '50px',
          fontFamily: 'BalooBhai2-SemiBold',
          fontSize: '36px',
          color: brandLight,
        }}
      >
        ${earnings}.00
      </div>

      <div
        style={{
          ...leftItem,
          top: '710px',
          height: '70px',
        }}
      >
        <img height={70} src={`data:image/png;base64,${base64Logo}`} alt="Community Logo" />
      </div>
      {/* FOOTER */}

      <div
        style={{
          ...lineItem,
          top: '810px',
          width: '862px',
          height: '214px',
        }}
      >
        <img height={100} src={`data:image/png;base64,${base64PoweredBy}`} alt="Powered by" />
      </div>
    </div>
  )
}

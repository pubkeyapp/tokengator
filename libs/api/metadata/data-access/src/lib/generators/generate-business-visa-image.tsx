/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */
import { Builder, JSX } from 'canvacord'
import { CSSProperties } from 'react'

export interface BusinessVisaBrands {
  discord: Buffer
  github: Buffer
  google: Buffer
  x: Buffer
}

export interface BusinessVisaSocials {
  discord?: string
  github?: string
  google?: string
  x?: string
}

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
  brands: BusinessVisaBrands
  socials: BusinessVisaSocials
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
  brands: BusinessVisaBrands
  socials: BusinessVisaSocials
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
      brands: props.brands,
      socials: props.socials,
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
        brands={this.options.get('brands')}
        socials={this.options.get('socials')}
      />
    )
  }
}

function TemplateRender({
  socials,
  brands,
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
  socials: BusinessVisaSocials
  brands: BusinessVisaBrands
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

  const socialMap = Object.keys(socials)
    .filter((key) => (socials[key as keyof BusinessVisaSocials] ?? '').length > 0)
    .map((key) => ({
      username: socials[key as keyof BusinessVisaSocials],
      icon: brands[key as keyof BusinessVisaBrands],
    }))

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
      {socialMap
        .filter((social) => (social.username ?? '')?.length > 0)
        .map((social, index) => {
          const top = 640 + index * 40
          return (
            <div key={index} style={{ ...lineItem, height: '50px', top: `${top}px`, fontSize: '24px' }}>
              <SocialIcon icon={social.icon.toString('base64')} username={social.username as string} />
            </div>
          )
        })}
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

function SocialIcon({ username, icon }: { username: string; icon: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <img height={24} src={`data:image/png;base64,${icon}`} alt="" />
      <span>{username}</span>
    </div>
  )
}

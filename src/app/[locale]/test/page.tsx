import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'

const TestPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <NextCloudinaryImage
        alt="LOGO"
        width={600}
        height={600}
        crop={'fit'}
        src="logo_tagadart_2ef62a5f8c"

        // removeBackground
      />
      <NextCloudinaryImage
        alt="LOGO"
        width={100}
        height={100}
        // crop={'fit'}
        src="climact_logo_b928550624_55cbb1b1a7.webp"
      />
      <NextCloudinaryImage
        alt="LOGO"
        width={100}
        height={100}
        crop={'fit'}
        src="EPFL_ab5f7697d7.jpg"
      />
      <div className="grid grid-cols-3 gap-4">
        <NextCloudinaryImage
          alt="LOGO"
          width={400}
          height={600}
          crop={'fill'}
          src="Community_App_Flyer_b2de057f30.png"
        />
        <NextCloudinaryImage
          alt="LOGO"
          width={400}
          height={600}
          crop={'fill'}
          src="Community_App_Flyer_b2de057f30.png"
        />
        <NextCloudinaryImage
          alt="LOGO"
          width={400}
          height={600}
          crop={'fill'}
          src="Community_App_Flyer_b2de057f30.png"
        />
      </div>
      <NextCloudinaryImage
        alt="LOGO"
        width={100}
        height={100}
        crop={'fit'}
        className="rounded-full"
        src="Nic_Temoignage_9fe5ea31a5.jpg"
      />
    </div>
  )
}

export default TestPage

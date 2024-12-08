import { ImageResponse } from "@vercel/og";
import { NEXT_PUBLIC_URL } from '@/app/config';
import fs from 'fs';
import path from 'path';

//export const runtime = "edge";
export const dynamic = "force-dynamic";

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// font 파일 경로
const fontPath = path.join(process.cwd(), 'public/fonts/Recipekorea.ttf');
const fontData = fs.readFileSync(fontPath);


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const profileName = searchParams.get('profileName');
  const fid = searchParams.get('fid');
  const profileImage = searchParams.get('profileImage') || `${NEXT_PUBLIC_URL}/default-image.png`;

  const btcUsdPrice = parseFloat(searchParams.get('btcUsdPrice') ?? "").toLocaleString();
  const btcKrwPrice = parseFloat(searchParams.get('btcKrwPrice') ?? "").toLocaleString();
  const ethUsdPrice = parseFloat(searchParams.get('ethUsdPrice') ?? "").toLocaleString();
  const ethKrwPrice = parseFloat(searchParams.get('ethKrwPrice') ?? "").toLocaleString();

  const degenUsdPrice = parseFloat(searchParams.get('degenUsdPrice') ?? "").toLocaleString();
  const degenKrwPrice = parseFloat(searchParams.get('degenKrwPrice') ?? "").toLocaleString();
  const moxieUsdPrice = parseFloat(searchParams.get('moxieUsdPrice') ?? "").toLocaleString();
  const moxieKrwPrice = parseFloat(searchParams.get('moxieKrwPrice') ?? "").toLocaleString();
  const rareUsdPrice = parseFloat(searchParams.get('rareUsdPrice') ?? "").toLocaleString();
  const rareKrwPrice = parseFloat(searchParams.get('rareKrwPrice') ?? "").toLocaleString();

  const btcChange   = parseFloat(searchParams.get('btcChange') ?? "").toLocaleString();
  const ethChange   = parseFloat(searchParams.get('ethChange') ?? "").toLocaleString();
  const degenChange = parseFloat(searchParams.get('degenChange') ?? "").toLocaleString();
  const moxieChange = parseFloat(searchParams.get('moxieChange') ?? "").toLocaleString();
  const rareChange  = parseFloat(searchParams.get('rareChange') ?? "").toLocaleString();

  const btcDominance = parseFloat(searchParams.get('btcDominance') ?? "").toLocaleString();
  const ethDominance = parseFloat(searchParams.get('ethDominance') ?? "").toLocaleString();
  const fearAndGreedValue = parseFloat(searchParams.get('fearAndGreedValue') ?? "").toLocaleString();
  const fearAndGreedClassification = (searchParams.get('fearAndGreedClassification') ?? "").replace(/\s+/g, '');
  

  

  if (searchParams != null) {
    return new ImageResponse(
      (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          //fontFamily: '"Arial", sans-serif',
          fontFamily: '"Poppins-Regular"', // 폰트 이름
          //backgroundColor: '#7158e2',
          color: '#FFFFFF',
          padding: '40px',
          boxSizing: 'border-box',
          //backgroundImage: 'linear-gradient(145deg, #6d5dfc 10%, #b2a3f6 90%)',
          backgroundImage: `url(${NEXT_PUBLIC_URL}/cryptomarket.png)`,
        }}
      >


        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '80px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', textAlign: 'left' }}>
            <img
              src={profileImage}
              height="150"
              width="150"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '20px',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: '30px', marginTop: '20px' }}>
              <div style={{ display: 'flex', marginRight: '20px' }}>@{profileName}</div>
              <div style={{ display: 'flex', marginRight: '40px' }}>FID:{fid}</div>
            </div>
          </div>

          {/* <div style={{ position: 'absolute', top: '0px', right: '170px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={`${NEXT_PUBLIC_URL}/Moxie_Maxi_Point.png`}
              height="180"
              width="180"  // 크기 조정
              style={{
                objectFit: 'contain',
              }}
            />
          </div> */}

          {/* <div style={{ position: 'absolute', top: '0px', right: '210px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={`${NEXT_PUBLIC_URL}/degen_logo.png`}
              height="130"
              width="130"  // 크기 조정
              style={{
                objectFit: 'contain',
              }}
            />
          </div> */}

          {/* <div style={{ position: 'absolute', top: '0px', right: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={`${NEXT_PUBLIC_URL}/Moxie_Maxi_HandsUp.png`}
              height="230"
              width="220"  // 크기 조정
              style={{
                objectFit: 'contain',
              }}
            />
          </div> */}

          {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong></strong>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-end', fontSize: '30px' }}>
              <strong style={{ marginLeft: '150px', fontSize: '25px' }}>$Degen</strong>
              <strong style={{ marginLeft: '150px' }}>{btcUsdPrice} USD</strong>
              <strong style={{ marginLeft: '150px' }}>{btcKrwPrice} KRW</strong>
            </div>
          </div> */}

        </div>


      {/* Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#FFFFFF', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <strong>Fear&Greed Index(0~100)</strong>
        </div>
      </div>
      <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '70px',
            backgroundColor: '#f3f3f3',
            borderRadius: '40px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: `${fearAndGreedValue}%`, // 진행 상황 (0~100)
              height: '100%',
              backgroundColor: '#4caf50',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '30px', // 글자 크기 추가
            }}
          >
            {fearAndGreedValue}({fearAndGreedClassification})
          </div>
        </div>
      </div>
      


        {/* 행 단위로 구성된 섹션들 */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#FFFFFF', marginTop: '30px', marginBottom: '30px'}}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Bitcoin dominance</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Ethereum dominance</strong>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#2600FF', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{btcDominance}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{ethDominance}</strong>
          </div>
        </div>

        {/* 행 단위로 구성된 섹션들 */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#FFFFFF', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Currency</strong>
          </div>                              
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>USD</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>KRW</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Change%(24h)</strong>
          </div>
       </div>

       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#2600FF', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Bitcoin</strong>
          </div>                              
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{btcUsdPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{btcKrwPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{btcChange}</strong>
          </div>
       </div>

       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#2600FF', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Ethereum</strong>
          </div>                              
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{ethUsdPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{ethKrwPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{ethChange}</strong>
          </div>
       </div>

       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#2600FF', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Degen</strong>
          </div>                              
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{degenUsdPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{degenKrwPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{degenChange}</strong>
          </div>
       </div>

       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#2600FF', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Moxie</strong>
          </div>                              
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{moxieUsdPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{moxieKrwPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{moxieChange}</strong>
          </div>
       </div>

       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: '35px', color: '#2600FF', marginBottom: '30px' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>Rare</strong>
          </div>                              
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{rareUsdPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{rareKrwPrice}</strong>
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <strong>{rareChange}</strong>
          </div>
       </div>


        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px', // Padding for left and right alignment
            fontSize: '24px', // Adjust font size as needed
            //color: 'black',
            fontFamily: '"Poppins-Regular"', // 폰트 이름
          }}
        >
          <span>{getKoreanISOString()}</span>

          {/* 작성자 */}
          <span>by @hemanruru</span>
        </div>

        </div>
      ),
      {
        width: 1200,
        height: 1200,
        fonts: [
          {
            name: 'Poppins-Regular',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      }
    );



    
  } else {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: "black",
            background: "white",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          Error fetching data :(. Please try again later.
        </div>
      ),
      {
        width: 1200,
        height: 1200,
        fonts: [
          {
            name: 'Poppins-Regular',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      }
    );
  }
}

function getKoreanISOString() {
  const now = new Date();
  const koreanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9 시간대 반영
  return koreanTime.toISOString().slice(0, 19).replace('T', ' ');
}

import { getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { init, validateFramesMessage } from '@airstack/frames';
import { getFarcasterUserDetails, FarcasterUserDetailsInput, FarcasterUserDetailsOutput } from '@airstack/frames';
import { fetchQuery } from "@airstack/node";
import { NEXT_PUBLIC_URL } from '@/app/config';
import { config } from "dotenv";
import { fetchUserData, updateInsertUserData } from '@/app/utils/supabase';
import { fetchCoinData } from '@/app/utils/fetchCoinData'; // utils 폴더에서 함수 가져오기

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export const dynamic = 'force-dynamic';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  try {

    const body = await req.json();

    config();
    const apiKey = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY ?? "default_api_key";
    init(apiKey ?? "");

    //프레임유효성검사
    const { isValid, message } = await validateFramesMessage(body);
    if (!isValid) {
      return new NextResponse('Message not valid', { status: 500 });
    }
    let myFid = Number(message?.data?.fid) || 0;
    //let myFid = 500371;
    const input: FarcasterUserDetailsInput = { fid: myFid };


   const socialCapitalQuery = `
          query MyQuery {
            Socials(
              input: {filter: {dappName: {_eq: farcaster}, userId: {_eq: "` + myFid + `"}}, blockchain: ethereum}
            ) {
              Social {
                profileDisplayName
                profileName
                userId
                profileImage
                profileImageContentValue {
                  image {
                    medium
                  }
                }
              }
            }
          }
       `;

    let profileName = '';
    let profileImage = '';   

    // 데이터 처리 함수 호출 후 그 결과를 기다림
    await main(myFid, socialCapitalQuery);

    //const main = async () => {
    async function main(myFid: number, socialCapitalQuery: string) {
      const server = "https://hubs.airstack.xyz";
      try {
        // API 요청을 병렬로 실행
        const [socialCapitalQueryData,] = await Promise.all([
          fetchQuery(socialCapitalQuery),
          
        ]);

        //socialCapitalQueryData
        const data = socialCapitalQueryData.data;

        profileName = data.Socials.Social[0].profileName;
        profileImage = data.Socials.Social[0].profileImage;

      } catch (e) {
        console.error(e);
      }
    };


    //크립토 실시간 데이터 가져오기    
    let btcUsdPrice = 0;
    let btcKrwPrice = 0;
    let ethUsdPrice = 0;
    let ethKrwPrice = 0;
    let degenUsdPrice = 0;
    let degenKrwPrice = 0;
    let moxieUsdPrice = 0;
    let moxieKrwPrice = 0;
    let rareUsdPrice = 0;
    let rareKrwPrice = 0;

    let btcChange = 0;
    let ethChange = 0;
    let degenChange = 0;
    let moxieChange = 0;
    let rareChange = 0;

    let btcDominance = 0;
    let ethDominance = 0;
    let fearAndGreedValue = 0;
    let fearAndGreedClassification = 'N/A';

    
    try {
      const { btcUsdPrice: tempBtcUsdPrice, btcKrwPrice: tempBtcKrwPrice, ethUsdPrice: tempEthUsdPrice, ethKrwPrice: tempEthKrwPrice,
              degenUsdPrice: tempDegenUsdPrice, degenKrwPrice: tempDegenKrwPrice, moxieUsdPrice: tempMoxieUsdPrice, moxieKrwPrice: tempMoxieKrwPrice, 
              rareUsdPrice: tempRareUsdPrice, rareKrwPrice: tempRareKrwPrice, 
              btcChange: tempBtcChange, ethChange: tempEthChange, degenChange: tempDegenChange, moxieChange: tempMoxieChange, rareChange: tempRareChange, 
              btcDominance: tempBtcDominance, ethDominance: tempEthDominance, 
              fearAndGreedValue: tempFearAndGreedValue, fearAndGreedClassification: tempFearAndGreedClassification
            } = await fetchCoinData();


      btcUsdPrice = parseFloat(tempBtcUsdPrice);
      btcKrwPrice = parseFloat(tempBtcKrwPrice);            
      ethUsdPrice = parseFloat(tempEthUsdPrice);
      ethKrwPrice = parseFloat(tempEthKrwPrice);            
      
      degenUsdPrice = parseFloat(tempDegenUsdPrice);
      degenKrwPrice = parseFloat(tempDegenKrwPrice);            
      moxieUsdPrice = tempMoxieUsdPrice;
      //moxieKrwPrice = parseFloat(tempMoxieKrwPrice).toLocaleString();
      moxieKrwPrice = parseFloat(tempMoxieKrwPrice);
      rareUsdPrice = parseFloat(tempRareUsdPrice);
      rareKrwPrice = parseFloat(tempRareKrwPrice);            

      btcChange = parseFloat(tempBtcChange);         
      ethChange = parseFloat(tempEthChange);         
      degenChange = parseFloat(tempDegenChange);         
      moxieChange = parseFloat(tempMoxieChange);         
      rareChange = parseFloat(tempRareChange);         

      btcDominance = parseFloat(tempBtcDominance);
      ethDominance = parseFloat(tempEthDominance);            
      fearAndGreedValue = parseFloat(tempFearAndGreedValue);
      fearAndGreedClassification = tempFearAndGreedClassification;           


      console.warn("btcUsdPrice=" + btcUsdPrice);
      console.warn("btcKrwPrice=" + btcKrwPrice);
      console.warn("ethUsdPrice=" + ethUsdPrice);
      console.warn("ethKrwPrice=" + ethKrwPrice);

      console.warn("degenUsdPrice=" + degenUsdPrice);
      console.warn("degenKrwPrice=" + degenKrwPrice);
      console.warn("moxieUsdPrice=" + moxieUsdPrice);
      console.warn("tempMoxieUsdPrice=" + tempMoxieUsdPrice);
      console.warn("moxieKrwPrice=" + moxieKrwPrice);
      console.warn("rareUsdPrice=" + rareUsdPrice);
      console.warn("rareKrwPrice=" + rareKrwPrice);

      console.warn("btcChange=" + btcChange);
      console.warn("ethChange=" + ethChange);
      console.warn("degenChange=" + degenChange);
      console.warn("moxieChange=" + moxieChange);
      console.warn("rareChange=" + rareChange);

      console.warn("btcDominance=" + btcDominance);
      console.warn("ethDominance=" + ethDominance);
      console.warn("fearAndGreedValue=" + fearAndGreedValue);
      console.warn("fearAndGreedClassification=" + fearAndGreedClassification);

    } catch (error) {
      console.error('Error fetching DEGEN price:', error);
    }


    //이미지URL 인코딩처리
    const encodedProfileImage = encodeURIComponent(profileImage);

    /**************** DB 작업 ****************/
    // DB에 업데이트 또는 삽입
    await updateInsertUserData({
      fid: myFid,
      profile_name: profileName,
      profile_image: profileImage,
      btc_usd_price: btcUsdPrice,
      btc_krw_price: btcKrwPrice,
      eth_usd_price: ethUsdPrice,
      eth_krw_price: ethKrwPrice,
      degen_usd_price: degenUsdPrice,
      degen_krw_price: degenKrwPrice,
      moxic_usd_price: moxieUsdPrice,
      moxie_krw_price: moxieKrwPrice,
      rare_usd_price: rareUsdPrice,
      rare_krw_price: rareKrwPrice,
      btc_dominance: btcDominance,
      eth_dominance: ethDominance,
      btc_change: btcChange,
      eth_change: ethChange,
      degen_change: degenChange,
      moxie_change: moxieChange,
      rare_change: rareChange,
      fear_and_greed_value: fearAndGreedValue,
      fear_and_greed_classification: fearAndGreedClassification,
    });
    /**************** DB 작업 끝 ****************/

  
    const frameUrl = `${NEXT_PUBLIC_URL}/api/frame?fid=${myFid}&cache_burst=${Math.floor(Date.now() / 1000)}`;

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          { 
            label: 'Check Crypto/🔎' 
          },
          { 
            action: 'link', 
            label: '🔄Share', 
            target: `https://warpcast.com/~/compose?text=Get real-time data from the crypto market. View the Fear and Greed Index, dominance, and real-time USD and KRW prices for Bitcoin and Altcoins. Frame created by @hemanruru&embeds%5B%5D=${encodeURIComponent(frameUrl)}`
          },
          {
            action: 'link', 
            label: '@sinbiro', 
            target: 'https://warpcast.com/hemanruru' 
          },
        ],
        image: { 
          src: `${NEXT_PUBLIC_URL}/api/og?profileName=${profileName}&fid=${myFid}&profileImage=${encodedProfileImage}
                                         &btcUsdPrice=${btcUsdPrice}&btcKrwPrice=${btcKrwPrice}&ethUsdPrice=${ethUsdPrice}&ethKrwPrice=${ethKrwPrice}
                                         &degenUsdPrice=${degenUsdPrice}&degenKrwPrice=${degenKrwPrice}&moxieUsdPrice=${moxieUsdPrice}&moxieKrwPrice=${moxieKrwPrice}
                                         &rareUsdPrice=${rareUsdPrice}&rareKrwPrice=${rareKrwPrice}
                                         &btcChange=${btcChange}&ethChange=${ethChange}&degenChange=${degenChange}&moxieChange=${moxieChange}&rareChange=${rareChange}
                                         &btcDominance=${btcDominance}&ethDominance=${ethDominance}
                                         &fearAndGreedValue=${fearAndGreedValue}&fearAndGreedClassification=${fearAndGreedClassification}
                                         &cache_burst=${Math.floor(Date.now() / 1000)}`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame?cache_burst=${Math.floor(Date.now() / 1000)}`,
        //state: { time: new Date().toISOString() },
      })
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}





export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}




export async function GET(req: NextRequest) {
  // Next.js의 NextRequest 객체에서 URL과 쿼리 매개변수를 직접 가져옵니다.
  const url = req.nextUrl; // NextRequest의 nextUrl 속성 사용
  const fid = Number(url.searchParams.get('fid')); // 'fid' 매개변수 추출

  console.log("Extracted FID:", fid);

  // frameData의 타입 정의
  interface FrameData {
    fid: number;
    profile_name: string;
    profile_image: string;
    btc_usd_price: number;
    btc_krw_price: number;
    eth_usd_price: number;
    eth_krw_price: number;
    degen_usd_price: number;
    degen_krw_price: number;
    moxic_usd_price: number;
    moxie_krw_price: number;
    rare_usd_price: number;
    rare_krw_price: number;
    btc_dominance: number;
    eth_dominance: number;
    btc_change: number,
    eth_change: number,
    degen_change: number,
    moxie_change: number,
    rare_change: number,
    fear_and_greed_value: number;
    fear_and_greed_classification: string;
  }

  /**************** DB 작업 ****************/
  const data = await fetchUserData(fid);
  if (!data || data.length === 0) {
    return new NextResponse('No data found', { status: 404 });
  }
  //console.log("api/frame/route.ts_data=" + JSON.stringify(data));
  /**************** DB 작업 끝 ****************/

  const frameData: FrameData = {
    fid: data.fid,
    profile_name: data.profile_name,
    profile_image: data.profile_image,
    btc_usd_price: data.btc_usd_price,
    btc_krw_price: data.btc_krw_price,
    eth_usd_price: data.eth_usd_price,
    eth_krw_price: data.eth_krw_price,
    degen_usd_price: data.degen_usd_price,
    degen_krw_price: data.degen_krw_price,
    moxic_usd_price: data.moxic_usd_price,
    moxie_krw_price: data.moxie_krw_price,
    rare_usd_price: data.rare_usd_price,
    rare_krw_price:  data.rare_krw_price,
    btc_dominance:  data.btc_dominance,
    eth_dominance:  data.eth_dominance,
    btc_change: data.btc_change,
    eth_change: data.eth_change,
    degen_change: data.degen_change,
    moxie_change: data.moxie_change,
    rare_change: data.rare_change,
    fear_and_greed_value:  data.fear_and_greed_value,
    fear_and_greed_classification: data.fear_and_greed_classification,
  };

  // frameData 배열을 JSON 문자열로 변환하고 URL 인코딩.

  const profileImage = encodeURIComponent(frameData.profile_image);
  const frameUrl = `${NEXT_PUBLIC_URL}/api/frame?fid=${frameData.fid}&cache_burst=${Math.floor(Date.now() / 1000)}`;
  //console.log("encodedDuneDataString_GET=" + JSON.stringify(duneDataString));

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        { 
          label: 'Check Crypto/🔎' 
        },
        { 
          action: 'link', 
          label: '🔄Share', 
          target: `https://warpcast.com/~/compose?text=Get real-time data from the crypto market. View the Fear and Greed Index, dominance, and real-time USD and KRW prices for Bitcoin and Altcoins. Frame created by @hemanruru&embeds%5B%5D=${encodeURIComponent(frameUrl)}`
        },
        {
          action: 'link', 
          label: '@sinbiro', 
          target: 'https://warpcast.com/hemanruru' 
        },
      ],
      image: { 
        src: `${NEXT_PUBLIC_URL}/api/og?profileName=${frameData.profile_name}&fid=${frameData.fid}&profileImage=${profileImage}
                                       &btcUsdPrice=${frameData.btc_usd_price}&btcKrwPrice=${frameData.btc_krw_price}&ethUsdPrice=${frameData.eth_usd_price}&ethKrwPrice=${frameData.eth_krw_price}
                                       &degenUsdPrice=${frameData.degen_usd_price}&degenKrwPrice=${frameData.degen_krw_price}&moxieUsdPrice=${frameData.moxic_usd_price}&moxieKrwPrice=${frameData.moxie_krw_price}
                                       &rareUsdPrice=${frameData.rare_usd_price}&rareKrwPrice=${frameData.rare_krw_price}
                                       &btcChange=${frameData.btc_change}&ethChange=${frameData.eth_change}&degenChange=${frameData.degen_change}&moxieChange=${frameData.moxie_change}&rareChange=${frameData.rare_change}
                                       &btcDominance=${frameData.btc_dominance}&ethDominance=${frameData.eth_dominance}
                                       &fearAndGreedValue=${frameData.fear_and_greed_value}&fearAndGreedClassification=${frameData.fear_and_greed_classification}
                                       &cache_burst=${Math.floor(Date.now() / 1000)}`,
        aspectRatio: '1:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?cache_burst=${Math.floor(Date.now() / 1000)}`,
      //state: { time: new Date().toISOString() },
    })
  );
}

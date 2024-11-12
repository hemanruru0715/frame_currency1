export async function fetchCoinData() {
    const { COINMARKETCAP_API_KEY } = process.env;
  
  // 비트코인 가격 데이터 가져오기
  const currencyResponse = fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BTC,ETH,DEGEN,MOXIE,RARE&convert=USD,KRW`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY || '',
      },
    }
  );

  // 글로벌 암호화폐 데이터 가져오기
  const globalMetricsResponse = fetch(
    `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY || '',
      },
    }
  );

  // 공포 탐욕지수
  const fearAndGreedResponse = fetch(
    `https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY || '',
      },
    }
  );

  // 모든 요청 병렬 실행
  const [currencyDataResponse, globalDataResponse, fearAndGreedDataResponse] = await Promise.all([
    currencyResponse,
    globalMetricsResponse,
    fearAndGreedResponse
  ]);

  // API 응답 검증
  if (!currencyDataResponse.ok) {
    throw new Error("Failed to fetch Bitcoin data");
  }
  if (!globalDataResponse.ok) {
    throw new Error("Failed to fetch global metrics data");
  }

  if (!fearAndGreedDataResponse.ok) {
    throw new Error("Failed to fetch fearAndGreedDataResponse data");
  }

  // 응답 데이터 파싱
  const currencyData = await currencyDataResponse.json();
  const globalData = await globalDataResponse.json();
  const fearAndGreedData = await fearAndGreedDataResponse.json();

    
  // console.log("currencyData=" + JSON.stringify(currencyData));
  // console.log("globalData=" + JSON.stringify(globalData));
  // console.log("fearAndGreedData=" + JSON.stringify(fearAndGreedData));
  
  // 화폐별 USD 및 KRW 가격 추출
  const btcUsdPrice = currencyData.data.BTC[0].quote.USD.price.toFixed(2);
  const btcKrwPrice = currencyData.data.BTC[0].quote.KRW.price.toFixed(0);

  const ethUsdPrice = currencyData.data.ETH[0].quote.USD.price.toFixed(2);
  const ethKrwPrice = currencyData.data.ETH[0].quote.KRW.price.toFixed(0);

  const degenUsdPrice = currencyData.data.DEGEN[0].quote.USD.price.toFixed(4);
  const degenKrwPrice = currencyData.data.DEGEN[0].quote.KRW.price.toFixed(2);

  const moxieUsdPrice = currencyData.data.MOXIE[0].quote.USD.price.toFixed(5);
  const moxieKrwPrice = currencyData.data.MOXIE[0].quote.KRW.price.toFixed(2);

  const rareUsdPrice = currencyData.data.RARE[0].quote.USD.price.toFixed(2);
  const rareKrwPrice = currencyData.data.RARE[0].quote.KRW.price.toFixed(0);

  // 글로벌 데이터 추출
  const btcDominance = globalData.data.btc_dominance.toFixed(2);
  const ethDominance = globalData.data.eth_dominance.toFixed(2);

  // 공포탐욕 데이터 추출
  const fearAndGreedValue = fearAndGreedData.data.value;
  const fearAndGreedClassification = fearAndGreedData.data.value_classification;

  // console.log("btcUsdPrice=" + btcUsdPrice);
  // console.log("btcKrwPrice=" + btcKrwPrice);
  
  // console.log("ethUsdPrice=" + ethUsdPrice);
  // console.log("ethKrwPrice=" + ethKrwPrice);

  // console.log("degenUsdPrice=" + degenUsdPrice);
  // console.log("degenKrwPrice=" + degenKrwPrice);
  
  // console.log("moxieUsdPrice=" + moxieUsdPrice);
  // console.log("moxieKrwPrice=" + moxieKrwPrice);
  
  // console.log("rareUsdPrice=" + rareUsdPrice);
  // console.log("rareKrwPrice=" + rareKrwPrice);

  // console.log("btcDominance=" + btcDominance);
  // console.log("ethDominance=" + ethDominance);
  
  // console.log("fearAndGreedValue=" + fearAndGreedValue);
  // console.log("fearAndGreedClassification=" + fearAndGreedClassification);


    return {btcUsdPrice, btcKrwPrice, ethUsdPrice, ethKrwPrice, degenUsdPrice, degenKrwPrice, 
            moxieUsdPrice, moxieKrwPrice, rareUsdPrice, rareKrwPrice, 
            btcDominance, ethDominance, fearAndGreedValue, fearAndGreedClassification };
  }
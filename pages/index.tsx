import React from 'react';
import _ from 'lodash';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const Home = () : JSX.Element => {

  const { loading, error, data } = useQuery(gql`
    query {
      protocolMetrics(first: 1, orderBy: timestamp, orderDirection: desc) {
        ohmPrice
        treasuryMarketValue
        ohmCirculatingSupply
      }
    }
  `);

  const metrics = data?.protocolMetrics[0];
  
  const treasuryMarketValue =  Math.round(metrics?.treasuryMarketValue);
  const ohmCirculatingSupply =  Math.round(metrics?.ohmCirculatingSupply);
  const backingPerOhm = Math.round(metrics?.treasuryMarketValue / metrics?.ohmCirculatingSupply * 100)/100;
  const ohmPrice = Math.round(metrics?.ohmPrice * 100)/100;

  return (
      <div>
        <div className="py-10">
          <div className="container px-5 mx-auto max-w-screen-lg">

            <div className="text-center mb-20 font-bold text-5xl heading">
              Abachi (3²,3²) backed by OHM 
            </div>

            <div className="grid md:grid-cols-2 gap-10">

              <div className="bg-white text-gray-900 shadow rounded-lg py-10 px-20 text-xl text-center mb-5">
                <div className="mb-3">
                  OHM Price
                </div>
                <div className="text-3xl fold-bold">
                  ${ohmPrice.toLocaleString()}
                </div>
              </div>

              <div className="bg-white text-gray-900 shadow rounded-lg py-10 px-20 text-xl text-center mb-5">
                <div className="mb-3">
                  Backing per OHM
                </div>
                <div className="text-3xl fold-bold">
                  ${backingPerOhm.toLocaleString()}
                </div>
              </div>

              <div className="bg-white text-gray-900 shadow rounded-lg py-10 px-20 text-xl text-center mb-10">
                <div className="mb-3">
                  Treasury Market Value
                </div>
                <div className="text-3xl fold-bold">
                  ${treasuryMarketValue.toLocaleString()}
                </div>
              </div>

              <div className="bg-white text-gray-900 shadow rounded-lg py-10 px-20 text-xl text-center mb-10">
                <div className="mb-3">
                  Circulating Supply
                </div>
                <div className="text-3xl fold-bold">
                  {ohmCirculatingSupply.toLocaleString()}
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
  );

}

const App = () => {

  const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/drondin/olympus-graph',
    cache: new InMemoryCache()
  });


  return(
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
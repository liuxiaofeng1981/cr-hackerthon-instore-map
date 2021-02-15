import { useEffect, useState } from 'react'

export default (searchTerm, currentLocation) => {
  const [searchResults, setSearchResults] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const searchKeywords = async keywords => {
    try {
      console.log('Setting loading to true')
      setLoading(true)

      const response = await new Promise(resolve =>
        setTimeout(() => {
          resolve({
            data: {
              result: {
                hits: [
                  {
                    _source: {
                      name: 'Chatime Chatswood',
                      imageFilePath:
                        'https://media-cdn.tripadvisor.com/media/photo-s/17/be/32/f5/try-the-traditional-twainese.jpg',
                      locationDisplay: 'Westfields Chatswood',
                      operatorRating: 4.8,
                      numReviewsRated: 1397,
                      experienceId: 1,
                      descriptionPreview: '8% cashback',
                      experienceSKU: '12345',
                      geoLocation: {
                        lat: -33.7970135,
                        lon: 151.1828416,
                      },
                      currency: 'AUD',
                      percent: 8,
                      isBestSeller: true,
                      isPromo: true,
                    },
                  },
                  {
                    _source: {
                      name: 'Mr Vitamins',
                      imageFilePath:
                        'https://media-exp1.licdn.com/dms/image/C560BAQHjbuBY2buvww/company-logo_200_200/0/1543553360172?e=2159024400&v=beta&t=ccs24__rHzbcoYrfZETZI1E7xRus7oaMMafSZ4RMRxU',
                      locationDisplay: 'Chatswood',
                      operatorRating: 4.2,
                      numReviewsRated: 263,
                      experienceId: 5,
                      descriptionPreview: '99% cashback',
                      experienceSKU: '12345',
                      geoLocation: {
                        lat: -33.7958817,
                        lon: 151.1837145,
                      },
                      currency: 'AUD',
                      percent: 99,
                      isBestSeller: true,
                      isPromo: true,
                    },
                  },
                  {
                    _source: {
                      name: 'JB HiFi Chatswood',
                      imageFilePath:
                        'data:image/png;base64,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',
                      locationDisplay: 'Westfields Chatswood',
                      operatorRating: 4.3,
                      numReviewsRated: 2853,
                      experienceId: 2,
                      descriptionPreview: '1.5% cashback',
                      experienceSKU: '12345',
                      geoLocation: {
                        lat: -33.7970135,
                        lon: 151.1828416,
                      },
                      currency: 'AUD',
                      percent: 1.5,
                      isBestSeller: true,
                      isPromo: true,
                    },
                  },
                  {
                    _source: {
                      name: 'Haidilao Hotpot',
                      imageFilePath:
                        'data:image/jpeg;base64,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',
                      locationDisplay: 'Westfields Chatswood',
                      operatorRating: 4.9,
                      numReviewsRated: 103,
                      experienceId: 3,
                      descriptionPreview: '10% cashback',
                      experienceSKU: '12345',
                      geoLocation: {
                        lat: -33.7975196,
                        lon: 151.1823194,
                      },
                      currency: 'AUD',
                      percent: 10,
                      isBestSeller: true,
                      isPromo: true,
                    },
                  },
                ],
              },
            },
          })
        }, 3000)
      )

      console.log('Inside searchKeywords!')
      setLoading(false)
      // setSearchResults(response.data.result.hits)
      setSearchResults({ result: response.data.result })
    } catch (err) {
      setLoading(false)
      setErrorMessage('Shit, something went wrong!')
    }
  }

  useEffect(() => {
    console.log('useEffect runs!')
    searchKeywords(searchTerm)
  }, [])

  return [searchKeywords, searchResults, errorMessage, loading]
}

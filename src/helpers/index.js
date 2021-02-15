export const getExperiencesForMap = experiences =>
  experiences.map(experience => ({
    id: experience._source.experienceId,
    name: experience._source.name,
    description: experience._source.descriptionPreview,
    sku: experience._source.experienceSKU,
    latlng: {
      latitude: experience._source.geoLocation.lat,
      longitude: experience._source.geoLocation.lon,
    },
    locationDisplay: experience._source.locationDisplay,
    imageFilePath: experience._source.imageFilePath,
    currency: experience._source.currency,
    price: experience._source.price,
    rating: experience._source.operatorRating,
    isBestSeller: experience._source.isBestSeller,
    isPromo: experience._source.isPromo,
    groupOf: experience._source.groupOf,
  }))

export const getExperiencesForMapAsObject = experiences =>
  experiences
    // .sort((a, b) => a.price < b.price ? -1 : 1)
    .reduce((mappedObject, experience) => {
      const key = JSON.stringify({
        latitude: experience._source.geoLocation.lat,
        longitude: experience._source.geoLocation.lon,
      })
      const experienceForMap = {
        id: experience._source.experienceId,
        name: experience._source.name,
        description: experience._source.descriptionPreview,
        sku: experience._source.experienceSKU,
        latlng: {
          latitude: experience._source.geoLocation.lat,
          longitude: experience._source.geoLocation.lon,
        },
        locationDisplay: experience._source.locationDisplay,
        imageFilePath: experience._source.imageFilePath,
        currency: experience._source.currency,
        percent: experience._source.percent,
        rating: experience._source.operatorRating,
        isBestSeller: experience._source.isBestSeller,
        isPromo: experience._source.isPromo,
      }
      if (!mappedObject[key]) {
        mappedObject[key] = [experienceForMap]
      } else if (
        !mappedObject[key].some(exp => exp.id === experienceForMap.id)
      ) {
        if (
          experienceForMap.price >
          mappedObject[key][mappedObject[key].length - 1].price
        ) {
          mappedObject[key].push(experienceForMap)
        } else {
          mappedObject[key].unshift(experienceForMap)
        }
      }
      return mappedObject
    }, {})

import getTutorialMovieData from '../store/tutorial-movie'

export default async function transTutorialMoive(data, pathname) {
  const tutorialMap = await getTutorialMovieData()
  for(let item in data)
  {
    if (tutorialMap.has(item.button_name)) {
        let row = tutorialMap.get(item.button_name)
        item.title = row.title
        item.comment = row.comment
      }
  }
  return data
}

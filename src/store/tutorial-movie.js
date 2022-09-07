import fetchData from '../fetch'
import parseCsv from '../utils/parseCsv'
import { trim } from '../utils'
import filter from '../utils/XSSFilter'
import { getLocalData, setLocalData } from './local-data'

const tutorialMap = new Map()
let loaded = false

const getTutorialMovieData = async () => {
  if (!loaded) {
    let csv = await getLocalData('tutorial-movie')
    if (!csv) {
      csv = await fetchData('/blhxfy/data/tutorial-movie.csv')
      setLocalData('tutorial-movie', csv)
    }
    const list = parseCsv(csv)
    list.forEach(item => {
      const button_name = filter(item.button_name)
      const title = filter(item.title)
      const comment = filter(item.comment)
      if (button_name && title) {
        tutorialMap.set(button_name, {title, comment})
      }
    })
    loaded = true
  }

  return tutorialMap
}

export default getTutorialMovieData

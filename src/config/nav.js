const navigation = [
  {
    name: 'Test',
    title: 'Test',
    url: 'test'
  },
  {
    name: 'Relationships',
    title: 'Relationships',
    url: 'relationships',
    subsections: [
      { exclude: true, name: 'Intro', url: 'intro' },
      {
        name: 'Marital & relationship status',
        url: 'status',
        subsections: [
          { name: 'Marital', url: 'marital' },
          { name: 'Cohabitants', url: 'cohabitant' }
        ]
      },
      { name: 'People who know you well', url: 'people' },
      { name: 'Relatives', url: 'relatives' },
      { exclude: true, name: 'Review', url: 'review' }
    ]
  }
]

const subsectionWalker = (section, urlPath) => {
  if (!section.subsections || !section.subsections.length) {
    return [section.url]
  }

  let paths = []
  for (let subsection of section.subsections) {
    let url = `${section.url}`
    let sPaths = subsectionWalker(subsection).map(i => {
      return `${url}/${i}`
    })
    paths = paths.concat(sPaths)
  }

  return paths
}

const test = () => {
  let nav = [...navigation]

  for (let section of nav) {
    console.log(subsectionWalker(section))
  }
}

test()

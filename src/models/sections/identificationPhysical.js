import eyeColor from 'models/shared/eyeColor'
import hairColor from 'models/shared/hairColor'
import height from 'models/shared/height'
import sex from 'models/shared/sex'
import weight from 'models/shared/weight'

const identificationPhysical = {
  Height: { presence: true, model: { validator: height } },
  Weight: { presence: true, model: { validator: weight } },
  HairColor: { presence: true, model: { validator: hairColor } },
  EyeColor: { presence: true, model: { validator: eyeColor } },
  Sex: { presence: true, model: { validator: sex } },
}

export default identificationPhysical

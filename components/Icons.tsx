import {
  Calendar,
  Edit2,
  Info,
  LucideIcon,
  MoonStar,
  Sun,
  Trash2,
  X,
} from 'lucide-react-native'
import { cssInterop } from 'nativewind'

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  })
}

interopIcon(Info)
interopIcon(MoonStar)
interopIcon(Sun)
interopIcon(Calendar)
interopIcon(X)
interopIcon(Trash2)
interopIcon(Edit2)

export { Info, MoonStar, Sun, Calendar, X, Trash2, Edit2 }

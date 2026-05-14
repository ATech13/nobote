
import Navbar from "./Navbar"

interface WrapperProps {
    children: React.ReactNode,
}
const Wrapper: React.FC<WrapperProps> = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default Wrapper
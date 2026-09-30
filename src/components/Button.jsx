import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "./Icons";

export function Button({ children, to, onClick, variant="solid", type="button", className="", disabled=false }) {
  const props={className:`button button--${variant} ${className}`,whileHover:disabled?undefined:{y:-3,scale:1.01},whileTap:disabled?undefined:{scale:.97},transition:{duration:.2,ease:[.22,1,.36,1]}};
  if(to) return <motion.div {...props}><Link to={to}>{children}<ArrowRightIcon size={17}/></Link></motion.div>;
  return <motion.button {...props} onClick={onClick} type={type} disabled={disabled}>{children}<ArrowRightIcon size={17}/></motion.button>;
}

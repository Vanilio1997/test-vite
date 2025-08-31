import { ISVGIcon } from '@/types';
import IconButton from '../IconButton';

interface IToggleSVGIcon {
    showicon: ISVGIcon;
    hideIcon: ISVGIcon;
    toggleFunc: () => void;
    isHidedElements: boolean;
}

const ToggleSVGIcon = ({
    hideIcon,
    showicon,
    toggleFunc,
    isHidedElements,
}: IToggleSVGIcon) => {
    return (
        <IconButton
            onClick={toggleFunc}
            icon={isHidedElements ? showicon.icon : hideIcon.icon}
            color={isHidedElements ? hideIcon.color : showicon.color}
            iconStyles={isHidedElements ? hideIcon.style : showicon.style}
            ariaLabel="toggle"
            
            
        />
    );
};

export default ToggleSVGIcon;

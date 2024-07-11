import profile from '../../assets/profile.jpg'
import './index.css'

const DarlingCallYou = ({onClick}) => {
    return (
        <div className="modal-backdrop" onClick={onClick}>
            <div className="avatar">
                <div className="h-40 w-40 bg-red-600 rounded-full flex justify-center items-center animation-pulse">
                    <img src={profile} alt={'profile narak narak'} className="rounded-full"/>
                </div>
            </div>
        </div>
    )
}

export default DarlingCallYou

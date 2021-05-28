import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';
 
export default function Modal(props) {

    return (
      <Dialog open={props.showModal}>
        <DialogTitle>Join room</DialogTitle>
        <DialogContent>
            <div className="mdc-dialog__content" id="my-dialog-content">
                Enter ID for room to join:
                <div className="mdc-text-field">
                    <input type="text" id="room-id" value={props.roomId} onChange={(e)=>props.setRoomId(e.target.value)} className="mdc-text-field__input"/>
                    <label className="mdc-floating-label" htmlFor="my-text-field"></label>
                    <div className="mdc-line-ripple"></div>
                </div>
            </div>
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Dismiss</DialogButton>
          <DialogButton action='accept' isDefault onClick={props.joinRoom} >Accept</DialogButton>
        </DialogFooter>
      </Dialog>
    );
}
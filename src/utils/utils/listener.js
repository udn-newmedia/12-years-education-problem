import { defaultStartEvent, defaultMovingEvent, defaultEndEvent } from './defaultEvent.js';

function registerListener(ed, evtType, evtPhase) {
  if (!ed.container) console.error('container cannot be empty.');
  if (!ed.target) console.error('target cannot be empty.');
  if (!ed.readyStatus || !ed[evtPhase]) return;
  
  let eventBundle = null
  switch (evtPhase) {
    case 'startEvent':
      eventBundle = () => {
        defaultStartEvent(ed, evtType);
        if (ed[evtPhase]) ed[evtPhase].bind(event, ed.edInfo)();        
      }
      break;  

    case 'moveEvent':
      eventBundle = () => {
        if (ed[evtPhase]) ed[evtPhase].bind(event, ed.edInfo)();        
        defaultMovingEvent(ed, evtType);
      }
      break;

    case 'endEvent':
      eventBundle = () => {
        if (ed[evtPhase]) ed[evtPhase].bind(event, ed.edInfo)();        
        defaultEndEvent(ed, evtType);
      }
      break;
  
    default:
      break;
  }

  ed.container.addEventListener(evtType, eventBundle, true);
}

function addStartListener(dr) {
  registerListener(dr, 'touchstart', 'startEvent');
  registerListener(dr, 'dragstart', 'startEvent');
}
function addMoveListener(dr) {
  registerListener(dr, 'touchmove', 'moveEvent');
  registerListener(dr, 'drag', 'moveEvent');
}
function addEndListener(dr) {
  registerListener(dr, 'touchend', 'endEvent');
  registerListener(dr, 'dragend', 'endEvent');
}

export { addStartListener, addMoveListener, addEndListener };
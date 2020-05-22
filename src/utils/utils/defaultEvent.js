function defaultStartEvent(ed, evtType) {
  switch (evtType) {
    case 'touchstart':
      ed.edInfo.dragStartCoord = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
      ed.edInfo.dragPreviousCoord = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
      break;
      
    case 'dragstart':
      
      break;
  
    default:
      break;
  }
  console.log('defaultStartEvent');
}
function defaultMovingEvent(ed, evtType) {
  event.preventDefault();
  switch (evtType) {
    case 'touchmove':
      
      break;
      
    case 'drag':
      
      break;
  
    default:
      break;
  }
  console.log('defaultMovingEvent');
}
function defaultEndEvent(ed, evtType) {
  switch (evtType) {
    case 'touchend':
      
      break;
      
    case 'dragend':
      
      break;
  
    default:
      break;
  }
  console.log('defaultEndEvent');
}

export { defaultStartEvent, defaultMovingEvent, defaultEndEvent };
const customStyles = {
  content : {
      display: 'block',
      margin: '48px 0 80px',
      position: 'relative',
      inset: '0px 0px',
      borderRadius:"8px",
      padding:"10px",
      minWidth: "300px"
    },
  overlay : {
    alignItems: 'flex-start',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    overflowY: 'auto',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1200,
    backgroundColor   : 'rgba(0,0,0,.4)',
  }
}
const customStylesFixWidth = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    position                   : 'absolute',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    hover                      : 'none',
    overflow                   : 'hidden',
    width: "94%"
  },
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    zIndex            : '101',
    width: "94%"
  },
};

const alertStyle = {
  position: 'top-right',
  effect: 'genie',
  offset: 60
}
const closeModalStyle = {
  position: 'absolute',
  top: '5px',
  right: '10px',
  fontSize: '20px',
  width: '30px',
  height: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255, 0.9)',
  color: '#000000',
  cursor: 'pointer'
}

const autocompleteStyle = {
  backgroundColor: '#fafcff',
  border: "medium none",
  borderRadius: "3px",
  padding: "0px",
  position: "absolute",
  boxShadow: "3px 3px 3px #888888",
  textShadow: "none",
  zIndex: "1000",
  color: "white",
  width: "94%"
}

const filterStyle = {
  backgroundColor: '#fafcff',
  border: "medium none",
  borderRadius: "3px",
  padding: "0px",
  position: "absolute",
  boxShadow: "3px 3px 3px #888888",
  textShadow: "none",
  zIndex: "1000",
  width: "94%"
}
export {customStyles,customStylesFixWidth, closeModalStyle, autocompleteStyle, filterStyle,}

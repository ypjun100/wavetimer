export default function SomethingIsWrongCard() {
    function onClick() {
        window.location.reload();
    }

    return (
        <div className="card-something-is-wrong">
            <p className="card-title">You found me!</p>
            <div className="spacer-5"></div>
            <p className="card-sub-title">Here is something mystery place. Refresh the page.</p>
            <div className="spacer-20"></div>
            <div style={{textAlign: 'center'}}>
                <div style={{cursor: 'pointer', backgroundColor: '#E3F0FF', borderRadius: '5px', padding: '0 15px', display: 'inline-block', height: '35px'}} onClick={onClick}>
                    <img src={require('../../../assets/images/refresh.png')} style={{width: '10px', verticalAlign: 'text-bottom', display: 'inline-block'}} alt="refresh"/>
                    <p style={{fontSize: '11pt', color: '#65A3EB', margin: '0', marginLeft: '8px', verticalAlign: 'sub', display: 'inline-block'}}>Refresh</p>
                </div>
            </div>
        </div>
    )
}
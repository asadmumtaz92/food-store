import React from 'react';
import ReactDOM from 'react-dom';

const CartModal = () => {

    const MyModal = () => {
        return (
            <div class="modal fade" id="myModal">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h4 class="modal-title">Your Items In Cart</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                            Show Selected Food Items...
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Order</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <MyModal />,
                document.getElementById('cart-modal-root')
            )}
        </React.Fragment>
    )
}

export default CartModal

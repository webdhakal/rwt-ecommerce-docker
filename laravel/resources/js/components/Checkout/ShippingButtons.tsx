const ShippingButtons = () => {
    return (
        <div className="mobile:flex-center flex gap-4">
            <button className="mobile:text-sm w-full rounded-lg bg-primary px-6 py-4 text-white">NEW SHIPPING</button>
            <button className="mobile:text-sm w-full rounded-lg bg-primary px-6 py-4 text-white">USER SHIPPING</button>
        </div>
    );
};

export default ShippingButtons;

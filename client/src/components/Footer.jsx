const Footer = () => {
    return (
        <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                    <div className="text-sm text-gray-400">UPower Dashboard. Built with React & Tailwind CSS.</div>

                    {/* right side of footer */}
                    <div className="text-xs text-gray-500">
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa';

const Footer = ({ onConsultation }) => {
    return (
        <footer className="bg-[#050505] text-luxury-ivory pt-32 pb-12 border-t border-white/5 font-body">
            <div className="container mx-auto px-6 md:px-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-3xl font-heading tracking-widest text-white mb-8 italic">LUMIÈRE</h2>
                        <p className="text-luxury-gray text-xs leading-7 mb-8 uppercase tracking-[0.2em] opacity-60">
                            Crafting eternity in every detail. <br />
                            The pinnacle of manual artistry.
                        </p>
                        <div className="flex space-x-8 text-luxury-gold/60">
                            <a href="#" className="hover:text-white transition-all duration-500 transform hover:-translate-y-1 block"><FaInstagram size={18} /></a>
                            <a href="#" className="hover:text-white transition-all duration-500 transform hover:-translate-y-1 block"><FaFacebookF size={18} /></a>
                            <a href="#" className="hover:text-white transition-all duration-500 transform hover:-translate-y-1 block"><FaPinterestP size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold mb-10">Collections</h4>
                        <ul className="space-y-5 text-[11px] uppercase tracking-[0.2em] text-luxury-gray">
                            <li><a href="#" className="hover:text-luxury-gold transition-colors duration-500">High Jewelry</a></li>
                            <li><a href="#" className="hover:text-luxury-gold transition-colors duration-500">Bridal Masterpieces</a></li>
                            <li><a href="#" className="hover:text-luxury-gold transition-colors duration-500">Private Archive</a></li>
                            <li><a href="#" className="hover:text-luxury-gold transition-colors duration-500">Curated Gifts</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold mb-10">Maison</h4>
                        <ul className="space-y-5 text-[11px] uppercase tracking-[0.2em] text-luxury-gray">
                            <li><a href="#" className="hover:text-luxury-gold transition-colors duration-500">Our Heritage</a></li>
                            <li><a href="#" className="hover:text-luxury-gold transition-colors duration-500">Artisanal Process</a></li>
                            <li>
                                {/* Point 2: Private Consultation Entry Point (Footer) */}
                                <button
                                    onClick={onConsultation}
                                    className="hover:text-luxury-gold transition-colors duration-500 uppercase text-left"
                                >
                                    Request a Private Consultation
                                </button>
                            </li>
                            <li><a href="#" className="hover:text-luxury-gold transition-colors duration-500">Contact Concierge</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.5em] text-luxury-gold mb-10">Newsletter</h4>
                        <p className="text-luxury-gray text-[10px] mb-8 uppercase tracking-widest leading-relaxed opacity-60">Join the LUMIÈRE inner circle for private exhibitions and early narratives.</p>
                        <form className="flex border-b border-white/10 pb-3 group">
                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="bg-transparent w-full outline-none text-white placeholder-white/10 text-[10px] uppercase tracking-[0.3em]"
                            />
                            <button className="text-luxury-gold hover:text-white text-[9px] uppercase tracking-[0.4em] transition-all duration-700">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/5 text-[9px] uppercase tracking-[0.4em] text-white/20">
                    <p>&copy; 2026 LUMIÈRE MAISON. ALL RIGHTS RESERVED.</p>
                    <div className="flex space-x-12 mt-6 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
                        <a href="#" className="hover:text-white transition-colors">Legal Notices</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;

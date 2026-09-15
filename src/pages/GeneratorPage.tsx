import React, { useState, useRef, useEffect } from 'react';
import {
  PostcardTemplate,
  PostcardCustomState,
  FontFamilyChoice,
  TextAlignment,
  TextPosition,
  VintageEffectType,
  ExportRatio,
  VintageBorder,
  RomanticQuote,
} from '../types';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { categories } from '../data/categories';
import { PostcardCanvas } from '../components/PostcardCanvas';
import { SponsorGateModal } from '../components/SponsorGateModal';
import { exportPostcardImage } from '../utils/exportPostcard';
import {
  Sparkles,
  Download,
  Dices,
  RotateCcw,
  Type,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Layers,
  Palette,
  Check,
  Smartphone,
  Square,
  Maximize2,
  Calendar,
  User,
  PenTool,
} from 'lucide-react';

interface GeneratorPageProps {
  initialTemplate?: PostcardTemplate;
  initialQuote?: RomanticQuote;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({
  initialTemplate,
  initialQuote,
}) => {
  const defaultTemplate = initialTemplate || postcards[0];

  // Postcard State
  const [customState, setCustomState] = useState<PostcardCustomState>({
    templateId: defaultTemplate.id,
    recipient: 'প্রিয়তমা,',
    message: initialQuote?.text || defaultTemplate.defaultQuote,
    sender: 'ইতি, তোমার...',
    date: '১৩ই শ্রাবণ, ঢাকা',
    style: {
      fontFamily: defaultTemplate.style.fontFamily,
      fontSize: defaultTemplate.style.fontSize,
      alignment: defaultTemplate.style.alignment,
      position: defaultTemplate.style.position,
      color: defaultTemplate.style.color,
      bold: defaultTemplate.style.bold,
      italic: defaultTemplate.style.italic,
      letterSpacing: defaultTemplate.style.letterSpacing || 0,
      lineHeight: defaultTemplate.style.lineHeight || 1.6,
    },
    border: defaultTemplate.border,
    effect: 'sepia',
    exportRatio: 'postcard',
    showStamp: true,
    showPostmark: true,
    showAirmailStripe: true,
  });

  // Sync if initial props change
  useEffect(() => {
    if (initialTemplate) {
      setCustomState((prev) => ({
        ...prev,
        templateId: initialTemplate.id,
        border: initialTemplate.border,
        style: {
          ...prev.style,
          ...initialTemplate.style,
        },
      }));
    }
  }, [initialTemplate]);

  useEffect(() => {
    if (initialQuote) {
      setCustomState((prev) => ({
        ...prev,
        message: initialQuote.text,
      }));
    }
  }, [initialQuote]);

  // Active editor tab
  const [activeTab, setActiveTab] = useState<'template' | 'quotes' | 'custom' | 'typography' | 'effects' | 'ratio'>('template');
  const [quoteCategoryFilter, setQuoteCategoryFilter] = useState<string>('সবগুলো');
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string>('সবগুলো');
  const [customInputText, setCustomInputText] = useState<string>('');

  // Download & Sponsor Gate State
  const [isSponsorGateOpen, setIsSponsorGateOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg'>('png');
  const [isExporting, setIsExporting] = useState(false);
  const postcardContainerRef = useRef<HTMLDivElement>(null);

  // Filtered lists
  const filteredTemplates = templateCategoryFilter === 'সবগুলো'
    ? postcards
    : postcards.filter((p) => p.category.includes(templateCategoryFilter));

  const filteredQuotes = quoteCategoryFilter === 'সবগুলো'
    ? quotes
    : quotes.filter((q) => q.category.includes(quoteCategoryFilter));

  // Surprise Me Handler
  const handleSurpriseMe = () => {
    const randomTemplate = postcards[Math.floor(Math.random() * postcards.length)];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const fontFamilies: FontFamilyChoice[] = [
      'Vintage Serif',
      'Calligraphy',
      'Elegant Bengali',
      'Typewriter',
      'Classic',
      'Handwritten',
    ];
    const randomFont = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
    const effects: VintageEffectType[] = ['sepia', 'old-paper', 'warm-vintage', 'faded', 'original'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];

    setCustomState((prev) => ({
      ...prev,
      templateId: randomTemplate.id,
      message: randomQuote.text,
      border: randomTemplate.border,
      effect: randomEffect,
      style: {
        ...prev.style,
        fontFamily: randomFont,
        fontSize: randomTemplate.style.fontSize,
      },
    }));
  };

  // Reset Text Style Handler
  const handleResetTextStyle = () => {
    const currentT = postcards.find((p) => p.id === customState.templateId) || postcards[0];
    setCustomState((prev) => ({
      ...prev,
      style: {
        fontFamily: currentT.style.fontFamily,
        fontSize: currentT.style.fontSize,
        alignment: currentT.style.alignment,
        position: currentT.style.position,
        color: currentT.style.color,
        bold: false,
        italic: false,
        letterSpacing: 0,
        lineHeight: 1.6,
      },
    }));
  };

  // Start Download trigger: Opens Sponsor Gate
  const handleStartDownload = (format: 'png' | 'jpg') => {
    setExportFormat(format);
    setIsSponsorGateOpen(true);
  };

  // Sponsor Gate Confirmation callback: Actually downloads the clean postcard image
  const handleConfirmedDownload = async () => {
    setIsSponsorGateOpen(false);
    if (!postcardContainerRef.current) return;
    setIsExporting(true);
    try {
      await exportPostcardImage({
        element: postcardContainerRef.current,
        fileName: `postlovebd-${customState.templateId}`,
        format: exportFormat,
        scale: 3, // High Resolution 3x
      });
    } catch (err) {
      console.error('Download error:', err);
      alert('পোস্টকার্ড ডাউনলোড করার সময় সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  // Curated Ink colors
  const inkColors = [
    { label: 'Antique Sepia', value: '#3b2418' },
    { label: 'Burgundy Wine', value: '#521319' },
    { label: 'Deep Walnut', value: '#24140e' },
    { label: 'Vintage Black', value: '#1a130f' },
    { label: 'Navy Indigo', value: '#132130' },
    { label: 'Forest Moss', value: '#1a2e20' },
    { label: 'Golden Ochre', value: '#785618' },
    { label: 'Aged Cream', value: '#f4ebd9' },
  ];

  const fontOptions: FontFamilyChoice[] = [
    'Vintage Serif',
    'Calligraphy',
    'Elegant Bengali',
    'Typewriter',
    'Classic',
    'Handwritten',
    'Old Newspaper',
  ];

  const effectsList: { id: VintageEffectType; name: string }[] = [
    { id: 'original', name: 'Original' },
    { id: 'sepia', name: 'Sepia' },
    { id: 'old-paper', name: 'Old Paper' },
    { id: 'faded', name: 'Faded' },
    { id: 'black-and-white', name: 'Black & White' },
    { id: 'film-grain', name: 'Film Grain' },
    { id: 'dust', name: 'Dust' },
    { id: 'scratch', name: 'Scratch' },
    { id: 'coffee-stain', name: 'Coffee Stain' },
    { id: 'warm-vintage', name: 'Warm Vintage' },
  ];

  const ratioList: { id: ExportRatio; label: string; desc: string }[] = [
    { id: 'postcard', label: 'Postcard (4:3)', desc: 'ভিন্টেজ ক্লাসিক রেশিও' },
    { id: 'square', label: 'Instagram Square (1:1)', desc: 'স্কয়ার পোস্টের জন্য' },
    { id: 'story', label: 'Instagram Story (9:16)', desc: 'ভার্টিক্যাল স্টোরি' },
    { id: 'facebook', label: 'Facebook Post (4:5)', desc: 'স্ট্যান্ডার্ড ফিড রেশিও' },
    { id: 'status', label: 'WhatsApp Status (9:16)', desc: 'হোয়াটসঅ্যাপ স্ট্যাটাস' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#c59b27]/20">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#c59b27] font-serif uppercase tracking-widest mb-1">
            <span>💌</span>
            <span>CUSTOM STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7efe1] tracking-wide">
            Vintage Postcard Generator
          </h1>
          <p className="text-xs sm:text-sm text-[#bda282] font-serif mt-0.5">
            পছন্দের পোস্টকার্ড ও প্রেমের উক্তি নির্বাচন করুন, কাস্টমাইজ করুন এবং লাইভ দেখে HD ডাউনলোড করুন।
          </p>
        </div>

        {/* Surprise Me & Primary Download Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSurpriseMe}
            className="px-4 py-2.5 rounded-lg bg-[#271911] hover:bg-[#382317] text-[#e8ba62] border border-[#c59b27]/40 text-xs sm:text-sm font-serif font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            title="র‍্যান্ডম পোস্টকার্ড ও উক্তি তৈরি করুন"
          >
            <Dices className="w-4 h-4 text-[#e8ba62]" />
            <span>🎲 Surprise Me</span>
          </button>

          <div className="flex items-center gap-1 bg-[#1a110c] p-1 rounded-lg border border-[#c59b27]/30">
            <button
              onClick={() => handleStartDownload('png')}
              disabled={isExporting}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-[#851c24] to-[#9e2732] hover:from-[#9e2732] hover:to-[#ba323f] text-[#fff5e3] text-xs sm:text-sm font-serif font-bold shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>⬇️ HD PNG</span>
            </button>
            <button
              onClick={() => handleStartDownload('jpg')}
              disabled={isExporting}
              className="px-3 py-2 rounded-md hover:bg-[#2c1d15] text-[#d6c2a8] text-xs font-serif font-semibold cursor-pointer"
            >
              JPG
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Canvas Preview, Right Step Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: LIVE POSTCARD PREVIEW (STATIONARY/STICKY) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full sticky top-24 space-y-4">
            {/* Aspect ratio quick selector header */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#18110c] border border-[#c59b27]/25 text-xs text-[#c5b29c]">
              <span className="font-serif font-medium text-[#e8ba62] flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>লাইভ প্রিভিউ ({customState.exportRatio.toUpperCase()})</span>
              </span>
              <div className="flex items-center gap-1">
                {ratioList.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setCustomState((prev) => ({ ...prev, exportRatio: r.id }))}
                    className={`px-2 py-0.5 rounded text-[10px] font-serif transition-colors ${
                      customState.exportRatio === r.id
                        ? 'bg-[#c59b27] text-[#120d0a] font-bold'
                        : 'text-[#9c8469] hover:text-[#f5ebd7]'
                    }`}
                  >
                    {r.id === 'postcard' ? '4:3' : r.id === 'square' ? '1:1' : r.id === 'facebook' ? '4:5' : '9:16'}
                  </button>
                ))}
              </div>
            </div>

            {/* Postcard Live Canvas Component with ref for HD export */}
            <div className="w-full flex justify-center p-2 sm:p-4 rounded-xl bg-[#140e0b]/80 border border-[#c59b27]/20 shadow-2xl">
              <PostcardCanvas
                innerRef={postcardContainerRef}
                customState={customState}
              />
            </div>

            {/* Small Quick Info below preview */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-[#8e7456] font-serif px-2">
              <span>* ডাউনলোড করার সময় শুধুমাত্র পোস্টকার্ডটি HD রেজল্যুশনে এক্সপোর্ট হবে।</span>
              <span>ইফেক্ট: {customState.effect}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STEP-BASED EDITOR CONTROLS */}
        <div className="lg:col-span-5 space-y-4">
          {/* Step Navigation Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-[#18110c] p-1 rounded-xl border border-[#c59b27]/30">
            <button
              onClick={() => setActiveTab('template')}
              className={`py-2 px-1 text-center rounded-lg text-xs font-serif font-bold transition-all ${
                activeTab === 'template'
                  ? 'bg-[#7a1c24] text-white shadow-xs'
                  : 'text-[#b89e80] hover:text-white hover:bg-[#241710]'
              }`}
            >
              ১. ডিজাইন
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`py-2 px-1 text-center rounded-lg text-xs font-serif font-bold transition-all ${
                activeTab === 'quotes'
                  ? 'bg-[#7a1c24] text-white shadow-xs'
                  : 'text-[#b89e80] hover:text-white hover:bg-[#241710]'
              }`}
            >
              ২. উক্তি
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`py-2 px-1 text-center rounded-lg text-xs font-serif font-bold transition-all ${
                activeTab === 'custom'
                  ? 'bg-[#7a1c24] text-white shadow-xs'
                  : 'text-[#b89e80] hover:text-white hover:bg-[#241710]'
              }`}
            >
              ৩. বার্তা
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`py-2 px-1 text-center rounded-lg text-xs font-serif font-bold transition-all ${
                activeTab === 'typography'
                  ? 'bg-[#7a1c24] text-white shadow-xs'
                  : 'text-[#b89e80] hover:text-white hover:bg-[#241710]'
              }`}
            >
              ৪. ফন্ট
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`py-2 px-1 text-center rounded-lg text-xs font-serif font-bold transition-all ${
                activeTab === 'effects'
                  ? 'bg-[#7a1c24] text-white shadow-xs'
                  : 'text-[#b89e80] hover:text-white hover:bg-[#241710]'
              }`}
            >
              ৫. ইফেক্ট
            </button>
            <button
              onClick={() => setActiveTab('ratio')}
              className={`py-2 px-1 text-center rounded-lg text-xs font-serif font-bold transition-all ${
                activeTab === 'ratio'
                  ? 'bg-[#7a1c24] text-white shadow-xs'
                  : 'text-[#b89e80] hover:text-white hover:bg-[#241710]'
              }`}
            >
              ৬. সাইজ
            </button>
          </div>

          {/* TAB 1: POSTCARD TEMPLATES */}
          {activeTab === 'template' && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#17100b] border border-[#c59b27]/30 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#c59b27]/20">
                <h3 className="text-sm font-serif font-bold text-[#f2e2cb]">
                  ১. পোস্টকার্ড নির্বাচন করুন
                </h3>
                <span className="text-[11px] text-[#8e7456] font-serif">
                  {postcards.length}+ টেমপ্লেট
                </span>
              </div>

              {/* Category Filter Chips */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {['সবগুলো', 'বৃষ্টি', 'প্রেমপত্র', 'রোমান্টিক', 'বিরহ', 'Classic Vintage', 'রাতের অনুভূতি'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setTemplateCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-serif whitespace-nowrap transition-colors ${
                        templateCategoryFilter === cat
                          ? 'bg-[#c59b27] text-[#120d0a] font-bold'
                          : 'bg-[#221610] text-[#c5b29c] hover:bg-[#2f1d15]'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              {/* Template Thumbnails Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
                {filteredTemplates.map((p) => {
                  const isSelected = customState.templateId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() =>
                        setCustomState((prev) => ({
                          ...prev,
                          templateId: p.id,
                          border: p.border,
                        }))
                      }
                      className={`relative rounded-lg overflow-hidden border p-1 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#e8ba62] bg-[#342217] ring-1 ring-[#e8ba62]'
                          : 'border-[#c59b27]/25 hover:border-[#c59b27]/60 bg-[#1c120c]'
                      }`}
                    >
                      <div className="w-full aspect-[4/3] rounded-xs bg-[#241812] flex items-center justify-center text-xl overflow-hidden">
                        💌
                      </div>
                      <div className="mt-1 px-1">
                        <div className="text-[11px] font-serif font-bold text-[#f7efe1] truncate">
                          {p.title}
                        </div>
                        <div className="text-[9px] text-[#bda282]">{p.category}</div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#c59b27] text-[#120d0a] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ROMANTIC QUOTES */}
          {activeTab === 'quotes' && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#17100b] border border-[#c59b27]/30 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#c59b27]/20">
                <h3 className="text-sm font-serif font-bold text-[#f2e2cb]">
                  ২. উক্তি নির্বাচন করুন
                </h3>
                <span className="text-[11px] text-[#8e7456] font-serif">
                  {quotes.length}+ উক্তি
                </span>
              </div>

              {/* Category Filter Chips for quotes */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {['সবগুলো', 'প্রেম', 'রোমান্টিক', 'বৃষ্টি', 'প্রেমপত্র', 'রাতের অনুভূতি', 'বিরহ', 'স্মৃতি', 'প্রপোজ'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setQuoteCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-serif whitespace-nowrap transition-colors ${
                        quoteCategoryFilter === cat
                          ? 'bg-[#c59b27] text-[#120d0a] font-bold'
                          : 'bg-[#221610] text-[#c5b29c] hover:bg-[#2f1d15]'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              {/* Quote List */}
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {filteredQuotes.map((q) => {
                  const isCurrent = customState.message === q.text;
                  return (
                    <div
                      key={q.id}
                      onClick={() => setCustomState((prev) => ({ ...prev, message: q.text }))}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'border-[#e8ba62] bg-[#331f15] shadow-xs'
                          : 'border-[#c59b27]/20 hover:border-[#c59b27]/45 bg-[#20140d]'
                      }`}
                    >
                      <p className="text-xs font-serif text-[#f2e5d5] leading-relaxed italic">
                        “{q.text}”
                      </p>
                      <div className="mt-2 pt-1.5 border-t border-[#c59b27]/15 flex items-center justify-between text-[10px]">
                        <span className="text-[#9e8362]">
                          {q.author ? `— ${q.author}` : q.category}
                        </span>
                        <button
                          type="button"
                          className="px-2 py-0.5 rounded bg-[#2b1910] hover:bg-[#7a1c24] text-[#e8ba62] hover:text-white border border-[#c59b27]/30 transition-colors"
                        >
                          {isCurrent ? 'নির্বাচিত ✓' : 'ব্যবহার করুন'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM MESSAGE (প্রাপক, মূল লেখা, প্রেরক, তারিখ) */}
          {activeTab === 'custom' && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#17100b] border border-[#c59b27]/30 space-y-4">
              <div className="pb-2 border-b border-[#c59b27]/20">
                <h3 className="text-sm font-serif font-bold text-[#f2e2cb]">
                  ✍️ অথবা নিজের লেখা লিখুন
                </h3>
                <p className="text-xs text-[#bda282] font-serif mt-0.5">
                  প্রাপক, মূল চিঠি, প্রেরকের নাম এবং তারিখ আপনার ইচ্ছেমতো সাজিয়ে নিন
                </p>
              </div>

              {/* প্রাপক */}
              <div>
                <label className="block text-xs font-serif text-[#d6c2a8] mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>প্রাপক (যেমন: "প্রিয়তমা,")</span>
                </label>
                <input
                  type="text"
                  value={customState.recipient}
                  onChange={(e) =>
                    setCustomState((prev) => ({ ...prev, recipient: e.target.value }))
                  }
                  placeholder="প্রিয়তমা,"
                  className="w-full px-3 py-2 rounded-lg bg-[#221610] border border-[#c59b27]/30 text-[#f5ebd7] text-xs font-serif focus:outline-hidden focus:border-[#c59b27]"
                />
              </div>

              {/* মূল লেখা */}
              <div>
                <label className="block text-xs font-serif text-[#d6c2a8] mb-1 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>মূল লেখা / উক্তি</span>
                </label>
                <textarea
                  rows={4}
                  value={customState.message}
                  onChange={(e) =>
                    setCustomState((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="এখানে আপনার নিজের লেখা লিখুন..."
                  className="w-full px-3 py-2 rounded-lg bg-[#221610] border border-[#c59b27]/30 text-[#f5ebd7] text-xs font-serif leading-relaxed focus:outline-hidden focus:border-[#c59b27]"
                />
              </div>

              {/* প্রেরক ও তারিখ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-serif text-[#d6c2a8] mb-1">
                    প্রেরক (যেমন: "ইতি, তোমার...")
                  </label>
                  <input
                    type="text"
                    value={customState.sender}
                    onChange={(e) =>
                      setCustomState((prev) => ({ ...prev, sender: e.target.value }))
                    }
                    placeholder="ইতি, তোমার..."
                    className="w-full px-3 py-2 rounded-lg bg-[#221610] border border-[#c59b27]/30 text-[#f5ebd7] text-xs font-serif focus:outline-hidden focus:border-[#c59b27]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif text-[#d6c2a8] mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>তারিখ (ঐচ্ছিক)</span>
                  </label>
                  <input
                    type="text"
                    value={customState.date}
                    onChange={(e) =>
                      setCustomState((prev) => ({ ...prev, date: e.target.value }))
                    }
                    placeholder="১৩ই শ্রাবণ, ঢাকা"
                    className="w-full px-3 py-2 rounded-lg bg-[#221610] border border-[#c59b27]/30 text-[#f5ebd7] text-xs font-serif focus:outline-hidden focus:border-[#c59b27]"
                  />
                </div>
              </div>

              {/* Decorative vintage elements toggle */}
              <div className="pt-2 border-t border-[#c59b27]/15 flex flex-wrap gap-4 text-xs font-serif text-[#bda282]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customState.showStamp}
                    onChange={(e) =>
                      setCustomState((prev) => ({ ...prev, showStamp: e.target.checked }))
                    }
                    className="accent-[#851c24] rounded-sm"
                  />
                  <span>ভিন্টেজ ডাকটিকিট</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customState.showPostmark}
                    onChange={(e) =>
                      setCustomState((prev) => ({ ...prev, showPostmark: e.target.checked }))
                    }
                    className="accent-[#851c24] rounded-sm"
                  />
                  <span>পোস্টমার্ক সীল (Dhaka GPO)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customState.showAirmailStripe}
                    onChange={(e) =>
                      setCustomState((prev) => ({ ...prev, showAirmailStripe: e.target.checked }))
                    }
                    className="accent-[#851c24] rounded-sm"
                  />
                  <span>Par Avion স্ট্রাইপ</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: TEXT CUSTOMIZATION (Font Family, Size, Alignment, Color, Reset) */}
          {activeTab === 'typography' && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#17100b] border border-[#c59b27]/30 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#c59b27]/20">
                <h3 className="text-sm font-serif font-bold text-[#f2e2cb]">
                  ৪. টাইপোগ্রাফি ও স্টাইল
                </h3>
                <button
                  onClick={handleResetTextStyle}
                  className="text-xs font-serif text-[#c59b27] hover:text-[#f8d48d] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Text Style</span>
                </button>
              </div>

              {/* Font Family Selector */}
              <div>
                <label className="block text-xs font-serif text-[#d6c2a8] mb-1.5">
                  Font Family (ফন্ট স্টাইল)
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {fontOptions.map((font) => (
                    <button
                      key={font}
                      onClick={() =>
                        setCustomState((prev) => ({
                          ...prev,
                          style: { ...prev.style, fontFamily: font },
                        }))
                      }
                      className={`p-2 rounded-lg text-left text-xs font-serif transition-all ${
                        customState.style.fontFamily === font
                          ? 'bg-[#7a1c24] text-white border border-[#d4af37]/40 font-bold'
                          : 'bg-[#221610] text-[#c5b29c] hover:bg-[#2d1b14] border border-[#c59b27]/20'
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-serif text-[#d6c2a8] mb-1">
                  <span>Font Size (আকার)</span>
                  <span className="text-[#c59b27] font-mono">{customState.style.fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="44"
                  value={customState.style.fontSize}
                  onChange={(e) =>
                    setCustomState((prev) => ({
                      ...prev,
                      style: { ...prev.style, fontSize: Number(e.target.value) },
                    }))
                  }
                  className="w-full accent-[#c59b27] cursor-pointer"
                />
              </div>

              {/* Alignment & Weight Controls */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#c59b27]/15">
                {/* Alignment */}
                <div className="flex items-center gap-1 bg-[#221610] p-1 rounded-lg border border-[#c59b27]/20">
                  <button
                    onClick={() =>
                      setCustomState((prev) => ({
                        ...prev,
                        style: { ...prev.style, alignment: 'left' },
                      }))
                    }
                    className={`p-1.5 rounded ${
                      customState.style.alignment === 'left'
                        ? 'bg-[#c59b27] text-[#120d0a]'
                        : 'text-[#ab957c]'
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setCustomState((prev) => ({
                        ...prev,
                        style: { ...prev.style, alignment: 'center' },
                      }))
                    }
                    className={`p-1.5 rounded ${
                      customState.style.alignment === 'center'
                        ? 'bg-[#c59b27] text-[#120d0a]'
                        : 'text-[#ab957c]'
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setCustomState((prev) => ({
                        ...prev,
                        style: { ...prev.style, alignment: 'right' },
                      }))
                    }
                    className={`p-1.5 rounded ${
                      customState.style.alignment === 'right'
                        ? 'bg-[#c59b27] text-[#120d0a]'
                        : 'text-[#ab957c]'
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bold & Italic */}
                <div className="flex items-center gap-1 bg-[#221610] p-1 rounded-lg border border-[#c59b27]/20">
                  <button
                    onClick={() =>
                      setCustomState((prev) => ({
                        ...prev,
                        style: { ...prev.style, bold: !prev.style.bold },
                      }))
                    }
                    className={`p-1.5 rounded ${
                      customState.style.bold ? 'bg-[#c59b27] text-[#120d0a]' : 'text-[#ab957c]'
                    }`}
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      setCustomState((prev) => ({
                        ...prev,
                        style: { ...prev.style, italic: !prev.style.italic },
                      }))
                    }
                    className={`p-1.5 rounded ${
                      customState.style.italic ? 'bg-[#c59b27] text-[#120d0a]' : 'text-[#ab957c]'
                    }`}
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Position */}
                <div className="flex items-center gap-1 bg-[#221610] p-1 rounded-lg border border-[#c59b27]/20">
                  {(['top', 'center', 'bottom'] as TextPosition[]).map((pos) => (
                    <button
                      key={pos}
                      onClick={() =>
                        setCustomState((prev) => ({
                          ...prev,
                          style: { ...prev.style, position: pos },
                        }))
                      }
                      className={`px-2 py-1 rounded text-[10px] font-serif uppercase ${
                        customState.style.position === pos
                          ? 'bg-[#c59b27] text-[#120d0a] font-bold'
                          : 'text-[#ab957c]'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ink Palette */}
              <div>
                <label className="block text-xs font-serif text-[#d6c2a8] mb-1.5">
                  Vintage Ink Color (কালির রঙ)
                </label>
                <div className="flex items-center gap-2">
                  {inkColors.map((ink) => (
                    <button
                      key={ink.value}
                      onClick={() =>
                        setCustomState((prev) => ({
                          ...prev,
                          style: { ...prev.style, color: ink.value },
                        }))
                      }
                      className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center relative cursor-pointer"
                      style={{
                        backgroundColor: ink.value,
                        borderColor: customState.style.color === ink.value ? '#c59b27' : '#4a3626',
                      }}
                      title={ink.label}
                    >
                      {customState.style.color === ink.value && (
                        <Check className="w-3.5 h-3.5 text-[#fff] filter drop-shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VINTAGE EFFECTS */}
          {activeTab === 'effects' && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#17100b] border border-[#c59b27]/30 space-y-4">
              <div className="pb-2 border-b border-[#c59b27]/20">
                <h3 className="text-sm font-serif font-bold text-[#f2e2cb]">
                  ৫. ভিন্টেজ ইফেক্ট নির্বাচন
                </h3>
                <p className="text-xs text-[#bda282] font-serif mt-0.5">
                  পোস্টকার্ডে পুরোনো দিনের সেপিয়া, ধুলোবালি বা ফিল্ম গ্রেইন আবহ যোগ করুন
                </p>
              </div>

              {/* Vintage Effects Grid */}
              <div className="grid grid-cols-2 gap-2">
                {effectsList.map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => setCustomState((prev) => ({ ...prev, effect: eff.id }))}
                    className={`p-3 rounded-lg text-left text-xs font-serif transition-all flex items-center justify-between cursor-pointer ${
                      customState.effect === eff.id
                        ? 'bg-[#7a1c24] text-white border border-[#d4af37]/40 font-bold shadow-xs'
                        : 'bg-[#221610] text-[#d6c2a8] hover:bg-[#2d1b14] border border-[#c59b27]/20'
                    }`}
                  >
                    <span>{eff.name}</span>
                    {customState.effect === eff.id && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>

              {/* Decorative Border choice */}
              <div className="pt-2 border-t border-[#c59b27]/15">
                <label className="block text-xs font-serif text-[#d6c2a8] mb-1.5">
                  Decorative Border (বর্ডার স্টাইল)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['classic', 'ornate', 'vintage-post', 'double-gold', 'antique-stamps', 'filigree'] as VintageBorder[]).map(
                    (b) => (
                      <button
                        key={b}
                        onClick={() => setCustomState((prev) => ({ ...prev, border: b }))}
                        className={`p-2 rounded-md text-center text-xs font-serif capitalize ${
                          customState.border === b
                            ? 'bg-[#c59b27] text-[#120d0a] font-bold'
                            : 'bg-[#221610] text-[#c5b29c] border border-[#c59b27]/20'
                        }`}
                      >
                        {b.replace('-', ' ')}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EXPORT SIZE RATIOS */}
          {activeTab === 'ratio' && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#17100b] border border-[#c59b27]/30 space-y-4">
              <div className="pb-2 border-b border-[#c59b27]/20">
                <h3 className="text-sm font-serif font-bold text-[#f2e2cb]">
                  ৬. এক্সপোর্ট সাইজ ও অ্যাসপেক্ট রেশিও
                </h3>
                <p className="text-xs text-[#bda282] font-serif mt-0.5">
                  যে সোশ্যাল প্ল্যাটফর্মে পোস্ট করতে চান তার জন্য উপযুক্ত অনুপাত নির্বাচন করুন
                </p>
              </div>

              <div className="space-y-2.5">
                {ratioList.map((r) => {
                  const isSelected = customState.exportRatio === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setCustomState((prev) => ({ ...prev, exportRatio: r.id }))}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#e8ba62] bg-[#342217] shadow-xs'
                          : 'border-[#c59b27]/25 hover:border-[#c59b27]/50 bg-[#221610]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                            isSelected ? 'bg-[#c59b27] text-[#120d0a]' : 'bg-[#2e1c12] text-[#c5b29c]'
                          }`}
                        >
                          {r.id === 'postcard' ? '4:3' : r.id === 'square' ? '1:1' : r.id === 'facebook' ? '4:5' : '9:16'}
                        </div>
                        <div>
                          <div className="text-xs font-serif font-bold text-[#f7efe1]">
                            {r.label}
                          </div>
                          <div className="text-[11px] text-[#9e8362]">{r.desc}</div>
                        </div>
                      </div>
                      {isSelected && <span className="text-[#e8ba62] text-sm">✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Direct CTA */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#1c120c] to-[#2b1810] border border-[#c59b27]/30 flex items-center justify-between gap-3 shadow-md">
            <div>
              <div className="text-xs font-serif font-bold text-[#f2e2cb]">
                পোস্টকার্ড প্রস্তুত?
              </div>
              <div className="text-[11px] text-[#a88f72] font-serif">
                HD কোয়ালিটিতে সেভ করুন
              </div>
            </div>
            <button
              onClick={() => handleStartDownload('png')}
              disabled={isExporting}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#851c24] to-[#a32631] hover:from-[#9e2732] hover:to-[#ba323f] text-white font-serif font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>ডাউনলোড করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sponsor Gate Modal (triggered before every download) */}
      <SponsorGateModal
        isOpen={isSponsorGateOpen}
        onClose={() => setIsSponsorGateOpen(false)}
        onConfirmDownload={handleConfirmedDownload}
        fileFormat={exportFormat}
      />
    </div>
  );
};

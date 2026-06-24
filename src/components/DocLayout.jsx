import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const DocLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    "getting-started": true,
    "api-reference": true,
    advanced: true,
  });
  const location = useLocation();

  const navigation = [
    {
      id: "getting-started",
      title: "Başlangıç",
      items: [
        { name: "Hızlı Başlangıç", href: "/quickstart", icon: "🚀" },
        { name: "Kimlik Doğrulama", href: "/authentication", icon: "🔐" },
        {
          name: "Nasıl Entegrasyon Yaparım?",
          href: "/integration-guide",
          icon: "🔧",
          disabled: true,
        },
        {
          name: "Hata Kodları (Yakında)",
          href: "/error-codes",
          icon: "⚠️",
          disabled: true,
        },
        {
          name: "Postman Collections (Yakında)",
          href: "/postman",
          icon: "📮",
          disabled: true,
        },
      ],
    },
    {
      id: "api-reference",
      title: "API Referansı",
      items: [
        {
          name: "Endpoints",
          href: "/endpoints",
          icon: "📚",
          subItems: [
            {
              name: "Kimlik Doğrulama",
              href: "/endpoints#integration-auth",
              icon: "🔐",
            },
            {
              name: "Kategori ve Marka Listeleme",
              href: "/endpoints#category-brand",
              icon: "🏷️",
            },
            {
              name: "Ürün Yönetimi",
              href: "/endpoints#product-management",
              icon: "📦",
            },
            {
              name: "Sipariş Yönetimi",
              href: "/endpoints#integration-orders",
              icon: "📋",
            },
            { name: "Fatura Yükleme", href: "/endpoints#invoices", icon: "📄" },
            {
              name: "Toplu İşlem Takibi",
              href: "/endpoints#integration-batch",
              icon: "⚙️",
            },
            {
              name: "Soru Cevap İşlemleri",
              href: "/endpoints#integration-qa",
              icon: "💬",
            },
            { name: "İade Yönetimi", href: "/endpoints#returns", icon: "↩️" },
            {
              name: "İade Yönetimi V2",
              href: "/endpoints#returns-v2",
              icon: "↩️",
            },
          ],
        },
        {
          name: "Webhooks (Yakında)",
          href: "/webhooks",
          icon: "🔗",
          disabled: true,
        },
        {
          name: "SDK'lar (Yakında)",
          href: "/sdks",
          icon: "📦",
          disabled: true,
        },
      ],
    },
    {
      id: "advanced",
      title: "Sistem Durumu",
      items: [
        { name: "Health Check", href: "/health", icon: "💚", disabled: true },
        { name: "Status", href: "/status", icon: "📊", disabled: true },
      ],
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const isCurrentPage = (href) => location.pathname === href;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Dökümantasyon
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-6">
            {navigation.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full px-2 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                >
                  <span>{section.title}</span>
                  {expandedSections[section.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {expandedSections[section.id] && (
                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => (
                      <div key={item.href}>
                        {item.disabled ? (
                          <div className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md text-slate-400 cursor-not-allowed opacity-75 bg-slate-50/50">
                            <span className="text-base grayscale opacity-75">
                              {item.icon}
                            </span>
                            <span>{item.name}</span>
                          </div>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-md transition-colors ${
                              isCurrentPage(item.href)
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                          >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.name}</span>
                          </Link>
                        )}

                        {/* Sub items for Endpoints */}
                        {item.subItems &&
                          (isCurrentPage(item.href) ||
                            item.href === "/endpoints") && (
                            <div className="ml-6 mt-2 space-y-1">
                              {item.subItems.map((subItem) =>
                                subItem.disabled ? (
                                  <div
                                    key={subItem.href}
                                    className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md text-slate-400 cursor-not-allowed opacity-75"
                                  >
                                    <span className="text-sm grayscale opacity-75">
                                      {subItem.icon}
                                    </span>
                                    <span>{subItem.name}</span>
                                  </div>
                                ) : (
                                  <Link
                                    key={subItem.href}
                                    to={subItem.href}
                                    onClick={(e) => {
                                      const [targetPath, targetHash] =
                                        subItem.href.split("#");
                                      if (location.pathname === targetPath) {
                                        e.preventDefault();
                                        const element =
                                          document.getElementById(targetHash);
                                        if (element) {
                                          element.scrollIntoView({
                                            behavior: "smooth",
                                          });
                                        }
                                      }
                                      setIsSidebarOpen(false);
                                    }}
                                    className="flex items-center space-x-3 px-4 py-2 text-sm rounded-md transition-colors text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                  >
                                    <span className="text-sm">
                                      {subItem.icon}
                                    </span>
                                    <span>{subItem.name}</span>
                                  </Link>
                                ),
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Hızlı Bağlantılar
            </h3>
            <div className="mt-3 space-y-1">
              <div className="flex items-center px-2 py-2 text-sm text-slate-400 bg-slate-50/50 rounded-md cursor-not-allowed opacity-75">
                <span className="mr-3 grayscale opacity-75">🌐</span>
                Partner Portal (Yakında)
              </div>
              <div className="flex items-center px-2 py-2 text-sm text-slate-400 bg-slate-50/50 rounded-md cursor-not-allowed opacity-75">
                <span className="mr-3 grayscale opacity-75">💬</span>
                Discord Destek (Yakında)
              </div>
              <div className="flex items-center px-2 py-2 text-sm text-slate-400 bg-slate-50/50 rounded-md cursor-not-allowed opacity-75">
                <span className="mr-3 grayscale opacity-75">📧</span>
                E-posta Destek (Yakında)
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pl-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-slate-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">
            Dökümantasyon
          </h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DocLayout;

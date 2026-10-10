"use client";

import { useState, useMemo } from "react";
import { galleryOutfits } from "@/data/outfits";
import { GalleryOutfit } from "@/types";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<GalleryOutfit | null>(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "casual", label: "Casual" },
    { id: "formal", label: "Formal" },
    { id: "streetwear", label: "Streetwear" },
    { id: "elegant", label: "Elegant" },
    { id: "hijab", label: "Hijab" },
  ];

  const filteredItems = useMemo(() => {
    return galleryOutfits.filter((item) => {
      const matchFilter = activeFilter === "all" || item.category === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <main>
      <section className="gallery-hero">
        <p>FITCAMP INSPIRATION</p>
        <h1>
          Find Your
          <span>Campus Look</span>
        </h1>
        <p className="hero-description">
          Cari inspirasi outfit kampus sesuai dengan style yang kamu suka.
        </p>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            id="searchInput"
            placeholder="Cari outfit, style, warna..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      <section className="gallery-container">
        <div className="filter-area">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div id="galleryGrid" className="gallery-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="gallery-card" onClick={() => setSelectedItem(item)}>
              <div className="gallery-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="gallery-info">
                <span className="gallery-category">{item.category}</span>
                <h3>{item.title}</h3>
                <div className="gallery-tags">
                  {item.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div id="noResult" className="no-result">
            <h3>Outfit tidak ditemukan</h3>
            <p>Coba cari dengan kata kunci lain.</p>
          </div>
        )}
      </section>

      {selectedItem && (
        <div id="outfitModal" className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <button id="closeModal" className="close-modal" onClick={() => setSelectedItem(null)}>
              ×
            </button>
            <div className="modal-image">
              <img id="modalImage" src={selectedItem.image} alt="Outfit" />
            </div>
            <div className="modal-info">
              <span id="modalCategory" className="modal-category">
                {selectedItem.category}
              </span>
              <h2 id="modalTitle">{selectedItem.title}</h2>
              <p id="modalDescription">{selectedItem.description}</p>
              <div className="modal-tags">
                {selectedItem.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

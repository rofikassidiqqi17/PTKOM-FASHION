"use client";

import { useState, useRef } from "react";
import { shirts, pants, shoes } from "@/data/outfits";
import { ClothingItem, AnalysisResult } from "@/types";
import { analyzeOutfit } from "@/lib/analyzer";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { currentUser, saveOutfit } = useAuth();

  const [selectedShirt, setSelectedShirt] = useState<ClothingItem | null>(null);
  const [selectedPants, setSelectedPants] = useState<ClothingItem | null>(null);
  const [selectedShoes, setSelectedShoes] = useState<ClothingItem | null>(null);

  const [shirtColor, setShirtColor] = useState<string>("#FFFFFF");
  const [pantsColor, setPantsColor] = useState<string>("#4169E1");
  const [shoesColor, setShoesColor] = useState<string>("#FFFFFF");

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [saveMessage, setSaveMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleAnalyze = () => {
    if (!selectedShirt) {
      setErrorMessage("Silakan pilih baju terlebih dahulu.");
      return;
    }
    if (!selectedPants) {
      setErrorMessage("Silakan pilih celana terlebih dahulu.");
      return;
    }
    if (!selectedShoes) {
      setErrorMessage("Silakan pilih sepatu terlebih dahulu.");
      return;
    }

    setErrorMessage("");
    const result = analyzeOutfit(
      selectedShirt,
      selectedPants,
      selectedShoes,
      shirtColor.toUpperCase(),
      pantsColor.toUpperCase(),
      shoesColor.toUpperCase()
    );
    setAnalysis(result);
    
    // Smooth scroll to result
    setTimeout(() => {
      document.getElementById("resultSection")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSave = () => {
    if (!analysis) return;
    const success = saveOutfit(analysis);
    if (success) {
      setSaveMessage({ text: "Outfit berhasil disimpan ke akun Anda!", isError: false });
    } else {
      setSaveMessage({ text: "Gagal menyimpan. Pastikan Anda sudah login.", isError: true });
    }
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">CAMPUS OUTFIT ASSISTANT</p>
          <h1>
            Find Your <span>Campus Style</span>
          </h1>
          <p>
            Pilih outfit yang kamu pakai, tentukan warnanya, lalu biarkan FITCAMP membantu menganalisis kombinasi outfit kamu.
          </p>
        </div>
      </section>

      <main className="analyzer">
        <div className="section-title">
          <p className="small-title">OUTFIT ANALYZER</p>
          <h2>Build Your Outfit</h2>
          <span>Pilih satu item untuk setiap kategori.</span>
        </div>

        <section className="item-section">
          <div className="item-heading">
            <div>
              <span className="item-number">01</span>
              <h3>Pilih Baju</h3>
            </div>
            <input
              type="color"
              value={shirtColor}
              onChange={(e) => setShirtColor(e.target.value)}
              title="Pilih warna baju"
            />
          </div>
          <div className="product-grid">
            {shirts.map((item) => (
              <div
                key={item.id}
                className={`product-card ${selectedShirt?.id === item.id ? "selected" : ""}`}
                onClick={() => setSelectedShirt(item)}
              >
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="product-info">
                  <h4>{item.name}</h4>
                  <span>Baju</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="item-section">
          <div className="item-heading">
            <div>
              <span className="item-number">02</span>
              <h3>Pilih Celana</h3>
            </div>
            <input
              type="color"
              value={pantsColor}
              onChange={(e) => setPantsColor(e.target.value)}
              title="Pilih warna celana"
            />
          </div>
          <div className="product-grid">
            {pants.map((item) => (
              <div
                key={item.id}
                className={`product-card ${selectedPants?.id === item.id ? "selected" : ""}`}
                onClick={() => setSelectedPants(item)}
              >
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="product-info">
                  <h4>{item.name}</h4>
                  <span>Celana</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="item-section">
          <div className="item-heading">
            <div>
              <span className="item-number">03</span>
              <h3>Pilih Sepatu</h3>
            </div>
            <input
              type="color"
              value={shoesColor}
              onChange={(e) => setShoesColor(e.target.value)}
              title="Pilih warna sepatu"
            />
          </div>
          <div className="product-grid">
            {shoes.map((item) => (
              <div
                key={item.id}
                className={`product-card ${selectedShoes?.id === item.id ? "selected" : ""}`}
                onClick={() => setSelectedShoes(item)}
              >
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="product-info">
                  <h4>{item.name}</h4>
                  <span>Sepatu</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="analyze-area">
          <button onClick={handleAnalyze} className="analyze-btn">
            Analyze My Outfit
          </button>
          {errorMessage && <p style={{ color: "#b04b5b", marginTop: "15px", fontSize: "14px", fontWeight: "500" }}>{errorMessage}</p>}
        </div>

        {analysis && (
          <section id="resultSection" className="result-section" style={{ display: "block" }}>
            <div className="result-heading">
              <p className="small-title">YOUR RESULT</p>
              <h2>Outfit Analysis</h2>
              <p>{analysis.recommendation.replace(/<[^>]*>?/gm, "")}</p>
            </div>

            <div className="main-result">
              <div className="style-result">
                <span>Dominant Style</span>
                <h2>{analysis.style}</h2>
              </div>
              <div className="overall-result">
                <span>Overall Score</span>
                <strong>{analysis.score}</strong>
                <small>/ 100</small>
              </div>
            </div>

            <div className="selected-outfit">
              <h3>Your Outfit</h3>
              <div className="selected-items">
                <div className="selected-item">
                  <img src={analysis.shirt.image} alt="Baju" />
                  <h4>{analysis.shirt.name}</h4>
                  <div className="color-box" style={{ backgroundColor: analysis.shirt.color }}></div>
                  <span>{analysis.shirt.color}</span>
                </div>
                <div className="selected-item">
                  <img src={analysis.pants.image} alt="Celana" />
                  <h4>{analysis.pants.name}</h4>
                  <div className="color-box" style={{ backgroundColor: analysis.pants.color }}></div>
                  <span>{analysis.pants.color}</span>
                </div>
                <div className="selected-item">
                  <img src={analysis.shoes.image} alt="Sepatu" />
                  <h4>{analysis.shoes.name}</h4>
                  <div className="color-box" style={{ backgroundColor: analysis.shoes.color }}></div>
                  <span>{analysis.shoes.color}</span>
                </div>
              </div>
            </div>

            <div className="analysis-wrapper">
              <div className="style-analysis">
                <h3>Style Analysis</h3>
                {(
                  [
                    { key: "casual", label: "Casual" },
                    { key: "modern", label: "Modern" },
                    { key: "streetwear", label: "Streetwear" },
                    { key: "formal", label: "Formal" },
                    { key: "elegant", label: "Elegant" },
                  ] as const
                ).map((item) => {
                  const score = analysis.styleScores[item.key];
                  return (
                    <div className="score-row" key={item.key}>
                      <span>{item.label}</span>
                      <div className="score-bar">
                        <div className="score-fill" style={{ width: `${score}%` }}></div>
                      </div>
                      <strong>{score}</strong>
                    </div>
                  );
                })}
              </div>

              <div className="compatibility">
                <h3>Outfit Compatibility</h3>
                <div className="compatibility-grid">
                  <div className="compatibility-card">
                    <span>Style Compatibility</span>
                    <strong>{analysis.styleCompatibility}%</strong>
                  </div>
                  <div className="compatibility-card">
                    <span>Color Compatibility</span>
                    <strong>{analysis.colorScore}%</strong>
                  </div>
                  <div className="compatibility-card">
                    <span>Overall</span>
                    <strong>{analysis.score}%</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="recommendation">
              <h3>Recommendation</h3>
              <p dangerouslySetInnerHTML={{ __html: analysis.recommendation }}></p>
            </div>

            <div className="save-outfit-area">
              <button onClick={handleSave} className="save-outfit-btn">
                ♡ Simpan Outfit
              </button>
              {saveMessage && (
                <p style={{ color: saveMessage.isError ? "#b04b5b" : "#628b69", marginTop: "15px", fontSize: "14px", fontWeight: "500" }}>
                  {saveMessage.text}
                </p>
              )}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

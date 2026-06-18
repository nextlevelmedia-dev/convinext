import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"

interface Review {
  stars: number
  reviewTitle: string
  reviewText: string
  authorName: string
  authorRole: string
  authorPhoto?: { asset: { _ref: string } }
  companyLogo?: { asset: { _ref: string } }
}

interface Avatar {
  photo?: { asset: { _ref: string } }
}

interface ReviewsSectionProps {
  titleHighlight?: string
  titleNormal?: string
  items?: Review[]
  ctaText?: string
  ctaHref?: string
  socialProofText?: string
  socialProofAvatars?: Avatar[]
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div
      style={{
        display: "inline-block",
        background: "linear-gradient(to right, #fc03b0, #047cf9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontSize: "18px",
        letterSpacing: "2px",
        marginBottom: "12px",
      }}
    >
      {"★".repeat(stars)}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="review-card card-adaptive rounded-2xl p-5 mb-3">
      <StarRating stars={review.stars} />

      {review.reviewTitle && (
        <h3
          className="review-card-title"
          style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", lineHeight: "1.4" }}
        >
          &ldquo;{review.reviewTitle}&rdquo;
        </h3>
      )}

      {review.reviewText && (
        <p
          className="review-card-text"
          style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}
        >
          &ldquo;{review.reviewText}&rdquo;
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {review.authorPhoto ? (
            <Image
              src={urlFor(review.authorPhoto).width(80).height(80).url()}
              alt={review.authorName}
              width={36}
              height={36}
              style={{ borderRadius: "50%", width: "36px", height: "36px", objectFit: "cover", flexShrink: 0 }}
            />
          ) : (
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(to right, #fc03b0, #047cf9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              {review.authorName?.charAt(0)}
            </div>
          )}
          <div>
            <p
              className="review-card-author"
              style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1.2 }}
            >
              {review.authorName}
            </p>
            {review.authorRole && (
              <p className="review-card-role" style={{ fontSize: "11px" }}>
                {review.authorRole}
              </p>
            )}
          </div>
        </div>

        {review.companyLogo && (
          <Image
            src={urlFor(review.companyLogo).width(120).height(60).url()}
            alt="logo"
            width={70}
            height={35}
            style={{ height: "28px", width: "auto", objectFit: "contain", flexShrink: 0 }}
          />
        )}
      </div>
    </div>
  )
}

const ctaStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #fc03b0, #047cf9)",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "16px",
  padding: "16px 40px",
  borderRadius: "999px",
  boxShadow: "0 8px 32px rgba(252,3,176,0.25)",
  textDecoration: "none",
  cursor: "pointer",
}

export default function ReviewsSection({
  titleHighlight,
  titleNormal,
  items,
  ctaText,
  ctaHref,
  socialProofText,
  socialProofAvatars,
}: ReviewsSectionProps) {
  if (!items?.length) return null

  const col1 = items.filter((_, i) => i % 3 === 0)
  const col2 = items.filter((_, i) => i % 3 === 1)
  const col3 = items.filter((_, i) => i % 3 === 2)

  return (
    <section id="recensioni" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {(titleHighlight || titleNormal) && (
          <div className="text-center mb-12 pb-4 max-w-2xl mx-auto">
            <h2
              className="reviews-title"
              style={{
                fontSize: "clamp(32px, 4vw, 42px)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "#0f172a",
              }}
            >
              {titleHighlight && (
                <span
                  style={{
                    background: "linear-gradient(to right, #fc03b0, #047cf9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {titleHighlight}
                </span>
              )}
              {titleHighlight && titleNormal && " "}
              {titleNormal}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
          <div>{col1.map((r, i) => <ReviewCard key={i} review={r} />)}</div>
          <div>{col2.map((r, i) => <ReviewCard key={i} review={r} />)}</div>
          <div>{col3.map((r, i) => <ReviewCard key={i} review={r} />)}</div>
        </div>

        {(ctaText || socialProofText) && (
          <div
            style={{
              marginTop: "48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
            }}
          >
            {ctaText && (
              <a href={ctaHref ?? "/contatti"} style={ctaStyle}>
                {ctaText}
              </a>
            )}

            {(socialProofAvatars?.length || socialProofText) && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {socialProofAvatars && socialProofAvatars.length > 0 && (
                  <div style={{ display: "flex" }}>
                    {socialProofAvatars.slice(0, 4).map((a, i) =>
                      a.photo ? (
                        <Image
                          key={i}
                          src={urlFor(a.photo).width(64).height(64).url()}
                          alt="cliente"
                          width={32}
                          height={32}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid white",
                            marginLeft: i > 0 ? "-8px" : "0",
                            position: "relative",
                            zIndex: 4 - i,
                          }}
                        />
                      ) : (
                        <div
                          key={i}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "linear-gradient(to right, #fc03b0, #047cf9)",
                            border: "2px solid white",
                            marginLeft: i > 0 ? "-8px" : "0",
                            position: "relative",
                            zIndex: 4 - i,
                          }}
                        />
                      )
                    )}
                  </div>
                )}
                {socialProofText && (
                  <p style={{ color: "#64748b", fontSize: "12px", fontWeight: 500 }}>
                    {socialProofText}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { Button } from "../components/Button";
import { Reveal } from "../components/Motion";

export default function About() {
  return (
    <div className="page">
      <section className="about-hero">
        <div>
          <p className="eyebrow">ICEEIT / ABOUT</p>
          <h1>
            Cold by name.
            <br />
            <span>Bold by nature.</span>
          </h1>
        </div>
        <ImagePlaceholder
          src="/images/jacket-side.jpg"
          alt="ICEEIT brand"
          label="jacket-side.jpg"
        />
      </section>

      <section className="story">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h2>
            ICEEIT was built around a simple idea: clothing can carry an
            attitude before you say a word.
          </h2>
          <p>
            Born from a love for contemporary streetwear and strong visual
            identity, ICEEIT is about pieces that feel current without chasing
            every trend. The brand brings together clean silhouettes, confident
            details and a cold visual language that makes the identity instantly
            recognisable.
          </p>
          <p>
            From everyday essentials to statement pieces, ICEEIT is designed for
            people who want their clothes to feel like part of who they are —
            not just something they put on.
          </p>
        </Reveal>
      </section>

      <section className="values">
        <div>
          <p className="eyebrow">01 / Identity</p>
          <h3>Recognisable, not noisy.</h3>
          <p>Every part of the brand should feel intentional and unmistakably ICEEIT.</p>
        </div>
        <div>
          <p className="eyebrow">02 / Style</p>
          <h3>Contemporary by design.</h3>
          <p>Pieces are made to work in real rotations while still carrying presence.</p>
        </div>
        <div>
          <p className="eyebrow">03 / Attitude</p>
          <h3>Wear it your way.</h3>
          <p>ICEEIT is a framework for self-expression, not a uniform.</p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready for the rotation?</h2>
        <Button to="/shop">Shop ICEEIT</Button>
      </section>
    </div>
  );
}
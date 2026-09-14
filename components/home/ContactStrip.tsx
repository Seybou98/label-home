import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";

export function ContactStrip() {
  return (
    <Reveal as="section" id="contact" className="contact-strip container">
      <div className="contact-icon">
        <Headphones />
      </div>
      <div>
        <strong>Vous avez un projet ? Parlons-en !</strong>
        <span>Nos conseillers vous répondent et vous accompagnent gratuitement.</span>
      </div>
      <div className="contact-phone">
        <strong>01 64 13 65 82</strong>
        <span>Lun. - Ven. : 8h - 19h / Sam. : 9h - 17h</span>
      </div>
      <Link href="/contact" className="btn btn-outline">
        ÊTRE RAPPELÉ GRATUITEMENT <ArrowRight />
      </Link>
    </Reveal>
  );
}

import Document from "@/components/document";
import FoldableDocuments from "@/components/FoldableDocuments";
import { InfoPage } from "@/components/InfoPage";
import { Section } from "@/components/Section";
import { Suspense } from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <Section>
          <InfoPage>Loading...</InfoPage>
        </Section>
      }
    >
      <FoldableDocuments />
      <Document id={id} />
    </Suspense>
  );
}

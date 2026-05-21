import './BrandKeywords.css';

const keywords = [
  {
    title: 'Takeout',
    tags: ['#포장손님', '#퇴근길수요', '#동네상권'],
  },
  {
    title: 'Regular',
    tags: ['#다시찾는', '#단골이생기는', '#가족저녁'],
  },
  {
    title: 'With',
    tags: ['#상담부터', '#함께보는', '#본사지원'],
  },
];

const BrandKeywords = () => {
  return (
    <section className="keyword-section" id="keyword">
      <div className="container">
        <h2>Brand Keyword</h2>
        <div className="keyword-grid">
          {keywords.map((keyword) => (
            <article className="keyword-circle" key={keyword.title}>
              <h3>{keyword.title}</h3>
              <span aria-hidden="true" />
              <p>{keyword.tags.join(' ')}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandKeywords;

const Home = ({names} : {names: string[]}) => {
    return 'Hola home'+names
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      names: ['paolo', 'gabriela'],
    },
  }
}

export default Home;
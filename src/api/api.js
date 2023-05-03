export const doFetch = async (url) => {
    const response = await fetch(
      url
    );
      const data = await response.json();
      return data;
    // this.setState({ images: data.hits, status: 'resolved' });
      
    // this.setState({ status: 'rejected' });
};

export default {
  doFetch,
};
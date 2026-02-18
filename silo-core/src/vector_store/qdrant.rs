use qdrant_client::{
    Qdrant,
    qdrant::{
        CreateCollectionBuilder, PointStruct, QueryPointsBuilder, UpsertPointsBuilder,
        VectorParamsBuilder,
    },
};

use qdrant_client::qdrant::Distance;

pub async fn setup_qdrant() -> Result<(), qdrant_client::QdrantError> {
    let client = Qdrant::from_url("http://localhost:6334").build()?;

    client
        .create_collection(
            CreateCollectionBuilder::new("test_collection")
                .vectors_config(VectorParamsBuilder::new(4, Distance::Cosine)),
        )
        .await?;

    let points = vec![
        PointStruct::new(1, vec![0.05, 0.61, 0.76, 0.74], [("city", "Berlin".into())]),
        PointStruct::new(2, vec![0.19, 0.81, 0.75, 0.11], [("city", "London".into())]),
        PointStruct::new(3, vec![0.36, 0.55, 0.47, 0.94], [("city", "Moscow".into())]),
    ];

    let response = client
        .upsert_points(UpsertPointsBuilder::new("test_collection", points).wait(true))
        .await?;

    dbg!(response);

    Ok(())
}

pub async fn search_collection() -> Result<String, qdrant_client::QdrantError> {
    let client = Qdrant::from_url("http://localhost:6334").build()?;

    let search_result = client
        .query(QueryPointsBuilder::new("test_collection").query(vec![0.2, 0.1, 0.9, 0.7]))
        .await?;

    dbg!(search_result);

    Ok(format!("Currently not Returning Any Points"))
}

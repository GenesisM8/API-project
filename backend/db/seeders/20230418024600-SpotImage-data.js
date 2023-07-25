'use strict';
/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/704468c1-47cd-44e0-9d1a-3ea3db51a2e6?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/280cf97f-f9f5-4d77-9fe8-a7c430d28ee4?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/c664a7bc-8ffb-4848-a552-830780b33b8d?im_w=1200",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/5af27ed5-323d-482d-8605-a64d15ac1a97?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-54336752/original/c766376d-239c-4d1e-b8d6-7702e3e8d322?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-54336752/original/30193ecf-db76-4204-99bb-3e70bc699761?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-54336752/original/a2dff941-9172-4510-b947-30d02b3bc4bf?im_w=720",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/3ee31b49-7daa-4511-b4b5-390c6ee934dd?im_w=1200",
        preview: true
      },
      {
        spotId: 5, //change this
        url: "https://a0.muscache.com/im/pictures/0b5e9362-c8b0-425f-a557-faede57d4499.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-51983675/original/f93a1913-1ce1-48d7-acd1-3c7ce98da1f1?im_w=720",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-51983675/original/c25be80d-6dc9-4846-a38c-a7863a2407e4?im_w=720",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-51983675/original/a08b2dce-d3ac-4ce5-9782-fd419ab727e8?im_w=720",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/8c9b48a8-a9b9-43e4-adbd-f37252e0b2d4?im_w=1200",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/d47a118f-315b-4745-8450-d5dfa1b1c1fa?im_w=720",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-543405303250325992/original/ce244035-7b1b-446c-a570-bb863ed37537?im_w=720",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-543405303250325992/original/55b4cc01-741a-4998-a4a7-f70912174d1c.jpeg?im_w=720",
        preview: true
      },

       {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/8829b15a-2169-4c81-b35c-8f4125d0d18f.jpg?im_w=1200",
        preview: true
      },

       {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/2cfd394c-493a-47a3-b47a-56f79496b647.jpg?im_w=960",
        preview: true
      },

       {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/8215c3ee-c983-4a63-9027-7ba5701453d9.jpg?im_w=720",
        preview: true
      },

       {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/84699625-9e9c-497a-b27a-84759292f7cc.jpg?im_w=1200",
        preview: true
      },

       {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/e668e026-f4d8-4dac-ac0a-ce549d1d57f7.jpg?im_w=1200",
        preview: true
      },

      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/5d7c999b-43cc-42a8-9cf4-b70e5303841d.jpg?im_w=1200",
        preview: true
      },

      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/4429d569-1ed6-4b35-8872-ba05cb809c4a.jpg?im_w=1200",
        preview: true
      },

      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/6f6c99dc-d722-4ce2-b097-5ade0866c85d.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/e638c3a3-946b-4b61-9ef8-294fa49f05e1.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/f06d36ba-01f3-45a2-81c9-483c99a4724a.jpg?im_w=1200",
        preview: true
      },

      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-737834406257870983/original/ccecd8b3-742d-4522-ba45-6709f78d7e32?im_w=1200",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/19f0ed60-d420-4bc4-a806-c24ec3ea285d.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/9593dcdd-f8f5-432e-aa95-33b47659ab53.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/cc873229-e34e-495b-826c-30276f13f21e.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/1f7fdc95-3c8f-42c4-ad18-27dad9ea72e9.jpg?im_w=720",
        preview: true
      },

      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/b2df2450-5cd2-454c-8041-70187789c11b.jpg?im_w=1200",
        preview: true
      },

       {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-620961925052711060/original/01ed18e9-8b47-46cc-8d52-836d4a53defe.jpeg?im_w=1200",
        preview: true
      },
       {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-620961925052711060/original/6991619f-b3ca-46ae-b838-766c1192884c.jpeg?im_w=720",
        preview: true
      },
       {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-620961925052711060/original/869a63cf-a65c-43a9-9a49-e54426fd8040.jpeg?im_w=1200",
        preview: true
      },
       {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-620961925052711060/original/3f564d5f-794c-4c80-ab72-501a760988e1.jpeg?im_w=1200",
        preview: true
      },
       {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-620961925052711060/original/1f296ee7-2efb-4129-ba09-a80fcc4a4e74.jpeg?im_w=1200",
        preview: true
      },

       {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-925480148015259788/original/b91c2075-fae9-41e7-b27c-6d590c22ff33.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-20475554/original/f30db0b4-cafe-498f-8a74-410b98d90b9d.jpeg?im_w=1440",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-20475554/original/aa0c3e1c-9f6c-4503-8bc6-ca239f09ef46.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-20475554/original/e87f799b-bbbc-49c1-b1b4-8f13cff93d84.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-20475554/original/c53f4c30-a3f4-469e-a531-bc7132e7cc6a.jpeg?im_w=720",
        preview: true
      },

      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/ab17f3fd-0fcc-40a0-937b-2c4d8fc4f4d4.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/82ddaef7-61fa-4e44-b277-9c78d5ee43c9.jpg?im_w=720",
        preview: true
      },
       {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/e3c1d752-da18-49fb-a5d8-1dcc15c01ebe.jpg?im_w=720",
        preview: true
      },
       {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/35b2df2c-3e71-41d3-9631-4b5cc8e11c12.jpg?im_w=720",
        preview: true
      },
       {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/8a4906c1-c766-4cc2-9d79-41dee53d6884.jpg?im_w=1200",
        preview: true
      },

       {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/58cf9c59-06c7-4f11-8cad-5244088ee81f.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/e1280ccc-f157-43a6-9375-9fbfd8510ee7.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/4eec9cc7-87f5-475c-9390-5af69c093dd5.jpg?im_w=720",
        preview: true
      },
       {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/d810e6dc-ee6a-4220-8131-474dba113668.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/5eebaf6f-e27f-42aa-a987-1ff373f38773.jpg?im_w=720",
        preview: true
      },

      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/fe337393-bca1-4642-9653-b4d76c885c1d.jpg?im_w=1200",
        preview: true
      },
        {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/b8f1e309-f04c-4754-ab5d-5929b126d6d9.jpg?im_w=1200",
        preview: true
      },
        {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/7c908a9e-779c-45f4-8a6c-68d341b45774.jpg?im_w=1200",
        preview: true
      },
        {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/bda15f6d-d20c-45e2-a793-4fae2159a8e8.jpg?im_w=720",
        preview: true
      },
        {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/73e85f1c-1828-4501-a58e-9cb999586f16.jpg?im_w=720",
        preview: true
      },

        {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/9cca0574-0703-4340-984b-bab0f46e7d6c.jpg?im_w=1200",
        preview: true
      },
        {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/da598955-aa1f-4a67-bf8a-adc53564df14?im_w=720",
        preview: true
      },
        {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/2a174255-8f15-4d62-aa82-ff845bd276c0?im_w=1200",
        preview: true
      },
        {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/9d6f1977-522b-4c87-9f38-8d14698f490d?im_w=1200",
        preview: true
      },
        {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/b5bbb52c-9ac2-4030-833d-ec38484d5204?im_w=1200",
        preview: true
      },

      {
        spotId: 14,
         url: "https://a0.muscache.com/im/pictures/monet/Luxury-720821287229431753/original/dff7b07a-5176-4bc5-ae24-3fbbe3de1a4d?im_w=720",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-737834406257870983/original/6ff2181f-be9a-4203-aa02-81d4b1f6e0c3?im_w=1200",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-737834406257870983/original/9b4f0ef5-136d-42fa-af45-571e2fbe55cc?im_w=1200",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-737834406257870983/original/5a917f89-7947-49a3-ad33-944f18faf2a2?im_w=1440",
        preview: true
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/monet/Luxury-737834406257870983/original/b2191893-d1db-4458-aa88-8f350cb4d75a?im_w=1200",
        preview: true
      },

       {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/18e573a3-b8fa-44ef-8610-962610dedf5c.jpg?im_w=1200",
        preview: true
      },

       {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/06fbcc6c-d989-40da-b9ad-8927bccdd944.jpg?im_w=720",
        preview: true
      },
       {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/b58f1e96-0815-467a-a82f-fabdea122ea8.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/bd54e70d-efe3-4862-aae4-a901e7ea53ea.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/38184efe-995d-4bd4-81bb-9c1245c27c0f.jpg?im_w=1200",
        preview: true
      },

      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-620961925052711060/original/2f301526-9ed6-421e-a4b6-f883e97a9d6f.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/48882c06-5b4c-41cd-9419-d7c0e25f63ba.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/2c0781ae-4cab-4c99-bc27-397f0e1d1b18.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/4f68b4a6-618b-44e7-9ba4-2cb4a01dd9b2.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/d73a4055-e8fd-45e6-9ad3-5595b208c726.jpg?im_w=720",
        preview: true
      },

      {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/98cf26a7-9521-4a06-9e8c-4f888bd101c2.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/20e06c5c-a360-4621-a7cc-23c483d6aa65.jpg?im_w=720",
        preview: true
      },
       {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/61e87728-13c4-401f-a0e0-bf6dc7ced926.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/6c2f037d-ab22-4407-8464-49c6496a579c.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/85f9df1a-a959-4848-8b3b-651b8f337d60.jpg?im_w=1200",
        preview: true
      },

       {
        spotId: 18,
        url: "https://a0.muscache.com/im/pictures/f2d1abff-430d-4413-ac5e-133242980dfd.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 18,
        url: "https://a0.muscache.com/im/pictures/43a6ffd4-f2a1-454d-b894-fe9ccf5c67b8.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 18,
        url: "https://a0.muscache.com/im/pictures/33ba1248-0f3c-45c6-ad5c-f2bb34baa982.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 18,
        url: "https://a0.muscache.com/im/pictures/0dc10e3a-9e33-4238-be06-7919a3a6535f.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 18,
        url: "https://a0.muscache.com/im/pictures/a1a6b55c-712f-44ea-b0bf-f7e3b13827a8.jpg?im_w=720",
        preview: true
      },

       {
        spotId: 19,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-777820817491139442/original/70de3997-09d3-4189-834d-4ff75d92055c.jpeg?im_w=1200",
        preview: true
      },
       {
        spotId: 19,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-777820817491139442/original/8a522a57-904a-4f6d-bec3-e36fd76191dd.jpeg?im_w=1200",
        preview: true
      },
       {
        spotId: 19,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-777820817491139442/original/b6704a06-8929-4fd8-84e6-a2ede07742eb.jpeg?im_w=1200",
        preview: true
      },
       {
        spotId: 19,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-777820817491139442/original/6616a440-b19c-4a15-9c2f-5cc8d91ea142.jpeg?im_w=1200",
        preview: true
      },
       {
        spotId: 19,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-777820817491139442/original/90ec13ee-db29-421f-8d06-b7c8a715b493.jpeg?im_w=1200",
        preview: true
      },

       {
        spotId: 20,
        url: "https://a0.muscache.com/im/pictures/ab6f30d8-9d5f-4d29-8234-ca0e5d9ccf72.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 20,
        url: "https://a0.muscache.com/im/pictures/97560533-6f7b-4a0b-84c5-f92ca0c8b771.jpg?im_w=1200",
        preview: true
      },
       {
        spotId: 20,
        url: "https://a0.muscache.com/im/pictures/2adb6eb7-32ab-43a7-98df-a6ac61530967.jpg?im_w=720",
        preview: true
      },
       {
        spotId: 20,
        url: "https://a0.muscache.com/im/pictures/ea1aa7ca-250a-4a32-8085-f984ae818fe8.jpg?im_w=720",
        preview: true
      },
       {
        spotId: 20,
        url: "https://a0.muscache.com/im/pictures/50203a3f-37be-4311-a3d8-b310edb92549.jpg?im_w=1200",
        preview: true
      },












      
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options)
  }
};
